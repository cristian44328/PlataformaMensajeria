import express from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors'

import path from "path";

import { connectDB } from './db.js'

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import {apps, server} from './libs/socket.js'

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

apps.use(express.json());
apps.use(cookieParser());
apps.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
apps.use(morgan('dev'));

apps.use("/api/auth", authRoutes);
apps.use("/api/message", messageRoutes);

if (process.env.NODE_ENV === "production") {
    apps.use(express.static(path.join(__dirname, "../client/dist")));
  
    apps.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
    });
  }

apps.listen(4000, () => {
    console.log('Server on port', 4000);
    connectDB()
})

