export interface Movie {
  properties: {
    characters: {
      id: number;
      name: string;
    }[];
    created: string;
    director: string;
    edited: string;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
  };
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface MoviesResponse {
  message: string;
  result: Movie[];
}
