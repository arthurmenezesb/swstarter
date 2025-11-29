import { createContext, useContext, type ReactNode } from "react";
import { useSearch } from "../hooks/useSearch";
import type { Movie } from "../../../types/movie";
import type { Person } from "../../../types/person";

type SearchType = "people" | "movies";

interface SearchContextType {
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  searchResults: (Movie | Person)[];
  loading: boolean;
  error: string | null;
  handleSearch: (searchValue: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const search = useSearch();

  return <SearchContext.Provider value={search}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};