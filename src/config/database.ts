import mongoose from 'mongoose';
import seedAdmin from '../DB';

const connectDB = async (): Promise<void> => {
  const uri =
    'mongodb+srv://bicycle-store:4RXvMyukIIh4O18p@cluster0.exf98yb.mongodb.net/bicycle_store?retryWrites=true&w=majority&appName=Cluster0 ';

  try {

     seedAdmin();
    await mongoose.connect(uri as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default connectDB;
