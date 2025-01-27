import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';

dotenv.config();

// Server Configuration
const PORT = process.env.PORT || 5000;

// Connect to Database and Start Server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
})();
