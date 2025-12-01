import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import api from './routes';
import requestLogInterceptor from './middleware/requestLogInterceptor';
import './services/dbService';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(requestLogInterceptor);

// Routes
app.use('/api/v1', api);

import errorHandler from './middleware/errorHandler';
app.use(errorHandler);

export default app;