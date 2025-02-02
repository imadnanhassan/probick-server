import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';

import router from './routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Middleware
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// application products routes
app.use('/api/v1', router);

// Global Error Handler
app.use(errorHandler);

// Not Found
// app.use(notFound)

export default app;

