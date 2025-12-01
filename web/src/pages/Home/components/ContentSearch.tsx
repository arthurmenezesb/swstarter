import { useState } from "react";
import Button from "../../../components/Button";
import { useSearchContext } from "../context/SearchContext";

const ContentSearch = () => {
  const { searchType, setSearchType, handleSearch } = useSearchContext();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    handleSearch(searchValue);
  };

  return (
    <div className="flex flex-col gap-4 min-w-sm h-fit">
      <div>
        <p>What are your searching for?</p>
      </div>
      <div className="flex gap-4">
        <div>
          <label>
            <input
              type="radio"
              value="people"
              checked={searchType === "people"}
              className="mr-2"
              onChange={() => setSearchType("people")}
            />
            People
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="movies"
              checked={searchType === "movies"}
              className="mr-2"
              onChange={() => setSearchType("movies")}
            />
            Movies
          </label>
        </div>
      </div>
      <div>
        <input
          type="search"
          value={searchValue}
          placeholder="e.g Chewbacca, Yoda, Boba Fett"
          className="w-full border rounded-sm"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <div>
        <Button label="SEARCH" onClick={handleSearchClick} disabled={!searchValue} />
      </div>
    </div>
  );
};

export default ContentSearch;
