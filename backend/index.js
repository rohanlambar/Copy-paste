import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';


import userRouter from './routes/userRoutes.js';
import cors from  'cors';
import connectionDb from './connectionDb.js';
import pasteRouter from './routes/pasteRoutes.js'

const PORT = process.env.PORT | 8000;
const mongo_url ="mongodb://127.0.0.1:27017/Copy&Paste";
// creating a express instance
const app = express()



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies
  })
);

connectionDb(mongo_url)
//making routes 

app.use('/',userRouter);
app.use('/paste',pasteRouter);



//making app listen

app.listen(PORT,()=>{console.log(`app listening on http://localhost:${PORT}`)});
