import { useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import api from "../../../services/api";
import type { Movie } from "../../../types/movie";
import type { Person, PersonListItem } from "../../../types/person";

type SearchType = "people" | "movies";

export const useSearch = () => {
  const { setIsLoading } = useLoading();
  const [searchType, setSearchType] = useState<SearchType>("people");
  const [searchResults, setSearchResults] = useState<(Movie | Person | PersonListItem)[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchValue: string) => {
    setLoading(true);
    setIsLoading(true);
    setError(null);
    try {
      const endpoint = searchType === "movies" ? "/movie" : "/person";
      const response = await api.get(endpoint, {
        params: {
          query: searchValue,
        },
      });
      if (searchType === "movies") {
        setSearchResults(response.data.result);
      } else {
        setSearchResults(response.data.results);
      }
    } catch {
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  return {
    searchType,
    setSearchType,
    searchResults,
    loading,
    error,
    handleSearch,
  };
};
