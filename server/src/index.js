import  'dotenv/config'; 
import mongoose from 'mongoose';
import { app , server } from './app.js';

const PORT = process.env.PORT || 5000;

;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}Polling`);

    server.listen(PORT, () => {
      console.log(` Server is listening on port ${PORT}`);
    });

  } catch (error) {
    console.error("ERROR:", error);
    throw error;
  }
})();

