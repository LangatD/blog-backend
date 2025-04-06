import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import contactRoutes from "./routes/contacts.js";
import userRouter from './routes/users.js';
dotenv.config();
const app = express();


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // Allow sending cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connection to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));

  app.options('*', cors()); 
// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);  
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});