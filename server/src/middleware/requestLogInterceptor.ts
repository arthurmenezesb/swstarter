import { Request, Response, NextFunction } from 'express';
import { insertRequestLog } from '../services/analyticsService';

const requestLogInterceptor = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationInMs = Number(end - start) / 1000000;
    insertRequestLog(req.method, req.originalUrl, durationInMs);
  });

  next();
};

export default requestLogInterceptor;