import { Request, Response, NextFunction } from 'express';
import { insertLog } from '../services/analyticsService';

const requestTiming = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationInMs = Number(end - start) / 1000000;
    insertLog(req.method, req.originalUrl, durationInMs);
  });

  next();
};

export default requestTiming;