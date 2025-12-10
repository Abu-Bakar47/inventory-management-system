import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import app from './app';

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});