import { Request, Response, NextFunction } from 'express';
import { getMoviesFromSwapi } from '../services/movieService';

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movies = await getMoviesFromSwapi();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};