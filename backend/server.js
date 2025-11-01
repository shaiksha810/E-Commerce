import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';


import dbconnection from './db/dbConnection.js';
import authRoutes from './routes/authRoutes.js'

const app = express();


// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,        
  })
);
app.use(cookieParser())
app.use(express.json());

// routes
app.use('/', authRoutes)




dbconnection();
app.listen(process.env.PORT || 5500, () => {
    console.log(`server is running on port:${process.env.PORT}`);
})