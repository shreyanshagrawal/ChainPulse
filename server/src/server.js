import 'dotenv/config';
import app from './app.js';
import mongoose from 'mongoose';
import simulationEngine from './services/simulationEngine.js';

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Connect to MongoDB if URI is provided
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB Connected');
    } catch (err) {
      console.error('❌ MongoDB connection failed:', err.message);
      process.exit(1);
    }
  } else {
    console.warn('⚠️  MONGO_URI not set — running without database (simulation only).');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
    simulationEngine.start();
  });
}

startServer();
