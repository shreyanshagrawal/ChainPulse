import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Route Imports
import shipmentRoutes from './routes/shipmentRoutes.js';
// import alertRoutes from './routes/alertRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(helmet());
// app.use(morgan('dev'));

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'ChainPulse API is running' });
});

app.use('/api/v1/shipments', shipmentRoutes);
// app.use('/api/v1/alerts', alertRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

export default app;
