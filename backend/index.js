import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';


import userRouter from './routes/userRoutes.js';
import cors from  'cors';
import connectionDb from './connectionDb.js';


const PORT = process.env.PORT | 8000;
const mongo_url ="mongodb://127.0.0.1:27017/Copy&Paste";
// creating a express instance
const app = express()



app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());


connectionDb(mongo_url)
//making routes 

app.use('/',userRouter);




//making app listen

app.listen(PORT,()=>{console.log(`app listening on http://localhost:${PORT}`)});
