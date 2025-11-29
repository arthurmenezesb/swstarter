import axios from 'axios';
import { PersonResponse } from '../types/person';
import { cache } from '../utils/cache';

const PEOPLE_CACHE_KEY = 'people';

export const getPersonFromSwapi = async (): Promise<PersonResponse> => {
  const cachedPerson = cache.get<PersonResponse>(PEOPLE_CACHE_KEY);
  if (cachedPerson) {
    return cachedPerson;
  }

  const allPeople: PersonResponse = {
    message: '',
    total_records: 0,
    total_pages: 0,
    previous: null,
    next: 'https://www.swapi.tech/api/people/',
    results: [],
  };
  let nextUrl = allPeople.next;

  while (nextUrl) {
    const response = await axios.get<PersonResponse>(nextUrl);
    const { results, next } = response.data;
    allPeople.results.push(...results);
    nextUrl = next;
  }
  allPeople.next = null;
  cache.set(PEOPLE_CACHE_KEY, allPeople);

  return allPeople;
};