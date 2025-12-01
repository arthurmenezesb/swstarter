import axios from 'axios';
import {
  Movie,
  MoviesResponse,
  MovieResponse,
  Character,
} from '../types/movie';
import { cache } from '../utils/cache';
import { getPersonByIdFromSwapi } from './personService';

const MOVIES_CACHE_KEY = 'movies';

export const getMoviesFromSwapi = async (): Promise<MoviesResponse> => {
  const cachedMovies = cache.get<MoviesResponse>(MOVIES_CACHE_KEY);
  if (cachedMovies) {
    return cachedMovies;
  }

  const response = await axios.get<MoviesResponse>(
    'https://www.swapi.tech/api/films/'
  );
  cache.set(MOVIES_CACHE_KEY, response.data);

  return response.data;
};

export const getMovieById = async (
  id: string,
  isAggregate: boolean
): Promise<MovieResponse | null> => {
  const movies = await getMoviesFromSwapi();
  const movie = movies.result.find((movie) => movie.uid === id);

  if (movie) {
    if (!isAggregate) {
      return {
        ...movies,
        result: movie,
      };
    }

    if (
      movie.properties.characters.length > 0 &&
      typeof movie.properties.characters[0] !== 'string'
    ) {
      return {
        ...movies,
        result: movie,
      };
    }

    const characterPromises = (movie.properties.characters as string[]).map(
      async (characterUrl) => {
        if (typeof characterUrl !== 'string') {
          return null;
        }
        const characterId = characterUrl.split('/').filter(Boolean).pop();
        if (characterId) {
          const person = await getPersonByIdFromSwapi(characterId);
          if (person) {
            return {
              id: person.uid,
              name: person.properties.name,
            };
          }
        }
        return null;
      }
    );

    const characters = (await Promise.all(characterPromises)).filter(
      Boolean
    ) as Character[];
    movie.properties.characters = characters;

    return {
      ...movies,
      result: movie,
    };
  }

  return null;
};

export const getMoviesByTitle = async (
  title: string
): Promise<MoviesResponse> => {
  const movies = await getMoviesFromSwapi();
  const filteredMovies = movies.result.filter((movie) =>
    movie.properties.title.toLowerCase().includes(title.toLowerCase())
  );

  return {
    ...movies,
    result: filteredMovies,
  };
};
