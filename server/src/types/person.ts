export interface Person {
  properties: {
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    created: string;
    edited: string;
    name: string;
    homeworld: string;
    url: string;
  };
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface PersonResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Person[];
}