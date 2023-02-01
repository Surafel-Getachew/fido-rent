import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dataBaseURI =
  process.env.DATABASE_URI || 'mongodb://localhost:27017/rockets';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log(`DB connected to ${dataBaseURI}`);
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
