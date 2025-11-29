import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message,
  });
};

export default errorHandler;