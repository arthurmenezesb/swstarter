import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import type { Movie } from "../../../types/movie";
import type { PersonListItem } from "../../../types/person";
import { useSearchContext } from "../context/SearchContext";

const ContentResults = () => {
  const { searchType, searchResults, loading, error } = useSearchContext();
  const navigate = useNavigate();

  const handleSeeDetails = (id: string) => () => {
    if (searchType === "movies") {
      navigate(`/movie/${id}`);
    } else {
      navigate(`/person/${id}`);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-center font-bold text-pinkish-grey">Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-center font-bold text-red-500">{error}</p>
        </div>
      );
    }

    if (searchResults && searchResults.length > 0) {
      return searchResults.map((item) => (
        <div key={item.uid}>
          <div className="flex items-center justify-between">
            <div className="w-2/3">
              <h3 className="text-md font-semibold">
                {searchType === "movies"
                  ? (item as Movie).properties.title
                  : (item as PersonListItem).name}
              </h3>
            </div>
            <div className="w-1/3 flex justify-end">
              <Button label="SEE DETAILS" onClick={handleSeeDetails(item.uid)} />
            </div>
          </div>
          <hr className="my-4 border-pinkish-grey" />
        </div>
      ));
    } else {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-center font-bold text-pinkish-grey">
            There are zero matches.
            <br />
            Use the form to search for People or Movies.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="min-w-lg h-[66.66vh] flex flex-col">
      <p className="text-lg font-bold">Results</p>
      <hr className="my-4 border-pinkish-grey" />
      <div className="space-y-4 grow">{renderContent()}</div>
    </div>
  );
};

export default ContentResults;
