import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';


import dbconnection from './db/dbConnection.js';
import authRoutes from './routes/authRoutes.js'

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-three-red-76.vercel.app"
    ],
    credentials: true,
  })
);

// routes
app.use('/', authRoutes)




dbconnection();
app.listen(process.env.PORT || 5000, () => {
    console.log(`server is running on port:${process.env.PORT }`);
})