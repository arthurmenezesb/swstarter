import React from "react";
import { Link, useParams } from "react-router-dom";
import DetailsContainer from "@/components/DetailsContainer";
import useFetch from "@/hooks/useFetch";
import type { Movie } from "@/types/movie";
import ErrorDisplay from "@/components/ErrorDisplay";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: movie, error } = useFetch<Movie>(`/movie/${id}`);

  if (error?.response?.status === 404) {
    return <ErrorDisplay message="Movie not found" />;
  }

  if (error) {
    return <ErrorDisplay message="Something went wrong!" />;
  }

  if (!movie) {
    return null;
  }

  return (
    <DetailsContainer title={movie?.properties.title || ""}>
      <div className="w-1/2">
        <p className="text-lg font-bold">Opening Crawl</p>
        <hr className="my-4 border-pinkish-grey" />
        <p className="whitespace-pre-wrap">{movie?.properties.opening_crawl}</p>
      </div>

      <div className="w-1/2">
        <p className="text-lg font-bold">Characters</p>
        <hr className="my-4 border-pinkish-grey" />
        <p>
          {movie?.properties.characters.map((character, index) => (
            <React.Fragment key={character.id}>
              <Link to={`/person/${character.id}`} className="text-emerald hover:underline">
                {character.name}
              </Link>
              {index < movie.properties.characters.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </DetailsContainer>
  );
};

export default MovieDetails;
