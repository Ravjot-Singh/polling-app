import express from "express";
import cors from "cors";
import http from 'http';
import {Server} from 'socket.io';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';
import jwt from "jsonwebtoken";
import { voteOption , togglePollStatus } from "./controllers/SocketPoll.controllers.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin :'http://localhost:5173' ,
        credentials : true
    }
});


app.use(cors({
    origin :'http://localhost:5173' ,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());

app.use("/api/users" , userRoutes)


io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);


  const token = socket.handshake.auth?.token;

  let user = null;

  try {

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    user = decodedToken; 

  } catch (err) {

    console.log(`Unauthenticated socket (${socket.id}) connected — can receive but not vote/toggle`);
  }

 
  socket.on('vote', async ({ optionId }) => {

    if (!user) {

      return socket.emit('error', { message: 'Authentication required to vote.' });
    }

    try {

      const updatedOption = await voteOption(user._id, optionId);

      io.emit('voteUpdate', { optionId, count: updatedOption.count });

    } catch (err) {

      socket.emit('error', { message: err.message });
    }
  });

 
  socket.on('togglePoll', async ({ pollId, isActive }) => {

    if (!user) {

      return socket.emit('error', { message: 'Authentication required to toggle poll.' });
    }

    try {

      const updatedPoll = await togglePollStatus(pollId, user._id, isActive);

      io.emit('pollStatusChanged', { pollId, isActive: updatedPoll.isActive });

    } catch (err) {

      socket.emit('error', { message: err.message });
    }
  });

  socket.on('disconnect', () => {

    console.log(`Client disconnected: ${socket.id}`);
  });
});





export { app , server}