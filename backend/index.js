// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import blogRoute from './routes/blog.route.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

// Initialize app and environment variables
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// Middleware for JSON parsing
app.use(express.json());

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

// MongoDB connection
const MONGODB_URL = process.env.MONGODB_URL;
try {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Database connection error:', err));
} catch (error) {
  console.error('Error during MongoDB connection:', error);
}

// Routes
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
console.log('Cloudinary configuration:', cloudinary.config().cloud_name);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World, Akshat!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



















//for creating blog


































//this is used to create the server 
// // const express = require('express')  //when we have used type:module in package.json we cannnot use old syntac of using require and we have to use import  as the modern syntax
// import express from 'express'
// const app = express()

// import dotenv from 'dotenv'
// dotenv.config()//this is used to confiq the dotenv to use the specified file
// const port = process.env.PORT;



// app.get('/', (req, res) => {
//   res.send('Hello World akshat!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })