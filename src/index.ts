import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './users/users.routes';
import petRoutes from './pets/pets.routes';
import pveRoutes from './petsvsenvironment/pve.routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());


// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/savr_backend_ts'; // Replace with your MongoDB URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.use('/users', userRoutes);
app.use('/pets', petRoutes);
app.use('/pve', pveRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});