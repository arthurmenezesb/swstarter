import React from "react";
import { Link } from "react-router-dom";
import DetailsContainer from "@/components/DetailsContainer";

const PersonDetails: React.FC = () => {

  const person = {
    name: "Luke Skywalker",
    birth_year: "19BBY",
    gender: "male",
    hair_color: "blond",
    eye_color: "blue",
    height: "172",
    mass: "77",
    movies: [
      {
        id: 3,
        title: "Return of the Jedi",
      },
    ],
  };
  return (
    <DetailsContainer title={person.name}>
      <div className="w-1/2">
        <p className="text-lg font-bold">Details</p>
        <hr className="my-4 border-pinkish-grey" />
        <p>Birth Year: {person.birth_year}</p>
        <p>Gender: {person.gender}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
      </div>

      <div className="w-1/2">
        <p className="text-lg font-bold">Movies</p>
        <hr className="my-4 border-pinkish-grey" />
        <p>
          {person?.movies.map((movie, index) => (
            <React.Fragment key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="text-emerald hover:underline">
                {movie.title}
              </Link>
              {index < person.movies.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </DetailsContainer>
  );
};

export default PersonDetails;
