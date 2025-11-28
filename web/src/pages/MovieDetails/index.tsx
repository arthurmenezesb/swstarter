import React from "react";
import { useParams, Link } from "react-router-dom";
import DetailsContainer from "@/components/DetailsContainer";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const movie = {
    id: 3,
    title: "Return of the Jedi",
    opening_crawl:
      "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy...",
    characters: [
      { id: 1, name: "Luke Skywalker" },
      { id: 2, name: "Chewbacca" },
    ],
  };

  return (
    <DetailsContainer title={movie.title}>
      <div className="w-1/2">
        <p className="text-lg font-bold">Opening Crawl</p>
        <hr className="my-4 border-pinkish-grey" />
        <p className="whitespace-pre-wrap">{movie.opening_crawl}</p>
      </div>

      <div className="w-1/2">
        <p className="text-lg font-bold">Characters</p>
        <hr className="my-4 border-pinkish-grey" />
        <p>
          {movie.characters.map((character, index) => (
            <React.Fragment key={character.id}>
              <Link to={`/person/${character.id}`} className="text-emerald hover:underline">
                {character.name}
              </Link>
              {index < movie.characters.length - 1 && ", "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </DetailsContainer>
  );
};

export default MovieDetails;
