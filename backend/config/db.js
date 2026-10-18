import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cricket_db';
    const conn = await mongoose.connect(mongoUri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Database] MongoDB connection failed: ${error.message}`);
    console.warn('[Database] Running without MongoDB. Start MongoDB to enable persistent storage.');
  }
};

export default connectDB;
