import { Request, Response, NextFunction } from 'express';
import { getMoviesFromSwapi, getMovieById as getMovieByIdService } from '../services/movieService';

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

export const getMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const movie = await getMovieByIdService(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    next(error);
  }
};