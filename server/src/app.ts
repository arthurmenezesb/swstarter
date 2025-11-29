import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import api from './routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/v1', api);

if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../../web/dist');
  app.use(express.static(frontendDist));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

import errorHandler from './middleware/errorHandler';
app.use(errorHandler);

export default app;