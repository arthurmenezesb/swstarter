import React from "react";
import { Link, useParams } from "react-router-dom";
import DetailsContainer from "@/components/DetailsContainer";
import useFetch from "@/hooks/useFetch";
import type { Person } from "@/types/person";

const PersonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: person, loading } = useFetch<Person>(`/person/${id}`);

  if (loading || !person) {
    return <div>Loading...</div>;
  }

  return (
    <DetailsContainer title={person?.properties.name || ""}>
      <div className="w-1/2">
        <p className="text-lg font-bold">Details</p>
        <hr className="my-4 border-pinkish-grey" />
        <p>Birth Year: {person?.properties.birth_year}</p>
        <p>Gender: {person?.properties.gender}</p>
        <p>Eye Color: {person?.properties.eye_color}</p>
        <p>Hair Color: {person?.properties.hair_color}</p>
        <p>Height: {person?.properties.height}</p>
        <p>Mass: {person?.properties.mass}</p>
      </div>

      <div className="w-1/2">
        <p className="text-lg font-bold">Movies</p>
        <hr className="my-4 border-pinkish-grey" />
        <p>
          {person?.properties.movies?.map((movie, index) => (
            <React.Fragment key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="text-emerald hover:underline">
                {movie.title}
              </Link>
              {person?.properties.movies && index < person.properties.movies.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </DetailsContainer>
  );
};

export default PersonDetails;
