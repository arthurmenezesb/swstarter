import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './routes';
import requestTiming from './middleware/requestTiming';
import './services/dbService';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(requestTiming);

// Routes
app.use('/api/v1', api);

import errorHandler from './middleware/errorHandler';
app.use(errorHandler);

export default app;