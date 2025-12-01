import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import processLogs from './worker/analyticsWorker';

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  setInterval(processLogs, 5 * 60 * 1000); // 5 minutes
});

const gracefulShutdown = () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server has been shut down.');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);