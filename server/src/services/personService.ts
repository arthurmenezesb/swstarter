import axios from 'axios';
import { Person, PersonsResponse, PersonResponse } from '../types/person';
import { cache } from '../utils/cache';
import { getMovieById } from './movieService';

const PEOPLE_CACHE_KEY = 'people';

export const getPersonFromSwapi = async (): Promise<PersonsResponse> => {
  const cachedPerson = cache.get<PersonsResponse>(PEOPLE_CACHE_KEY);
  if (cachedPerson) {
    return cachedPerson;
  }

  const allPeople: PersonsResponse = {
    message: '',
    total_records: 0,
    total_pages: 0,
    previous: null,
    next: 'https://www.swapi.tech/api/people/',
    results: [],
  };
  let nextUrl = allPeople.next;

  while (nextUrl) {
    const response = await axios.get<PersonsResponse>(nextUrl);
    const { results, next } = response.data;
    allPeople.results.push(...results);
    nextUrl = next;
  }
  allPeople.next = null;
  cache.set(PEOPLE_CACHE_KEY, allPeople);

  return allPeople;
};

export const getPersonByIdFromSwapi = async (
  id: string,
): Promise<Person | null> => {
  const PERSON_CACHE_KEY = `person-${id}`;
  const cachedPerson = cache.get<Person>(PERSON_CACHE_KEY);
  if (cachedPerson) {
    return cachedPerson;
  }

  try {
    const response = await axios.get(
      `https://www.swapi.tech/api/people/${id}`
    );
    const person = response.data.result;
    if (person && person.properties && person.properties.films) {
      console.log('1')
      const filmPromises = person.properties.films.map(
        async (filmUrl: string) => {
          const filmId = filmUrl.split('/').filter(Boolean).pop();
          console.log('2')
          if (filmId) {
            const movieResponse = await getMovieById(filmId, false);
            console.log('hereeeee')
            if (movieResponse && movieResponse.result) {
              const movie = movieResponse.result;
              return {
                id: movie.uid,
                title: movie.properties.title,
              };
            }
          }
          return null;
        }
      );

      const movies = (await Promise.all(filmPromises)).filter(Boolean);
      person.properties.movies = movies;
    }

    cache.set(PERSON_CACHE_KEY, person);

    return person;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};
export const getPersonByName = async (
  name: string
): Promise<PersonsResponse> => {
  const allPeople = await getPersonFromSwapi();
  const filteredPeople = allPeople.results.filter((person) => {
    const personName = 'name' in person ? person.name : person.properties.name;
    return personName.toLowerCase().includes(name.toLowerCase());
  });

  return {
    ...allPeople,
    results: filteredPeople,
    total_records: filteredPeople.length,
  };
};

export const getPersonById = async (
  id: string,
): Promise<PersonResponse | null> => {
  const person = await getPersonByIdFromSwapi(id);

  if (!person) {
    return null;
  }

  const personResponse: PersonResponse = {
    message: 'ok',
    result: person,
  };

  return personResponse;
};