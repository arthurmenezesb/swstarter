import axios from 'axios';
import { MoviesResponse } from '../types/movie';
import { cache } from '../utils/cache';

const MOVIES_CACHE_KEY = 'movies';

export const getMoviesFromSwapi = async (): Promise<MoviesResponse> => {
  const cachedMovies = cache.get<MoviesResponse>(MOVIES_CACHE_KEY);
  if (cachedMovies) {
    return cachedMovies;
  }

  const response = await axios.get<MoviesResponse>('https://www.swapi.tech/api/films/');
  cache.set(MOVIES_CACHE_KEY, response.data);

  return response.data;
};