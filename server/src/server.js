import app from './app.js';
import simulationEngine from './services/simulationEngine.js';
// import mongoose from 'mongoose';

const PORT = process.env.PORT || 5000;

// Note: Ensure your .env has MONGO_URI setup before uncommenting mongoose connect.
// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log('MongoDB Connected');
// }).catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Start the background hackathon simulation loop
  simulationEngine.start();
});
