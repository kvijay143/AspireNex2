import express from 'express'
import mongoose from "mongoose";
import authroute from './routes/authroute.js'
import cookieParser from 'cookie-parser';
import quizroute from './routes/quizroute.js';
import cors from 'cors';
const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
mongoose.connect('mongodb+srv://kvijay:12345678kartik@cluster0.9nojyxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("Database Connected Succesfully");
}).catch((err)=>{
    console.log(err);
})

const PORT=8000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });


  app.use('/api/auth',authroute);
  app.use('/api/quiz',quizroute);



//   app.use((err,req,res,next)=>{
//     const statusCode=err.statusCode || 500;
//     const message=err.message || "Internal Server Error"
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     })
// })
app.listen(PORT,()=>{
    console.log("Server is running on port 8000");
})