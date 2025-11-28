import { createContext, useState, type ReactNode } from "react";

type SearchType = "people" | "movies";

interface SearchContextData {
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
}

export const SearchContext = createContext<SearchContextData | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchType, setSearchType] = useState<SearchType>("people");

  return (
    <SearchContext.Provider value={{ searchType, setSearchType }}>
      {children}
    </SearchContext.Provider>
  );
};
