import express from "express";
import cors from "cors";
import http from 'http';
import {Server} from 'socket.io';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.routes.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin : process.env.CORS_ORIGIN,
 //       credentials : true
    }
});


app.use(cors({
    origin: process.env.CORS_ORIGIN,
  //  credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser());

app.use("/api/users" , userRoutes)


io.on('connection' , (socket)=>{
    console.log(`Client connected : ${socket.id}`);

    socket.on('vote' , ({optionId})=>{
        io.emit('voteUpdate' , {optionId});
    });

    socket.on('disconnect' , ()=>{
        console.log(`Client disconnected : ${socket.id}`);
    })

});




export { app , server}