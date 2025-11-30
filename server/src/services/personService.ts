import axios from 'axios';
import { Person, PersonResponse } from '../types/person';
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

export const getPersonByIdFromSwapi = async (
  id: string
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
    const person = response.data;
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
): Promise<PersonResponse> => {
  const allPeople = await getPersonFromSwapi();
  const filteredPeople = allPeople.results.filter((person) => {
    const personName =
      'properties' in person ? person.properties.name : person.name;
    return personName.toLowerCase().includes(name.toLowerCase());
  });

  return {
    ...allPeople,
    results: filteredPeople,
    total_records: filteredPeople.length,
  };
};