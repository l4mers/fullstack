import { useSelector } from "react-redux";
import SearchComponent from "./SearchComponent";
import SearchBreadCrumbs from "./SearchBreadCrumbs";
import SearchHeading from "./SearchHeading";
import SearchResults from "./SearchResults";

const SearchPage = () => {
  const { isLoading } = useSelector((state) => state.loader);

  return (
    <>
      <SearchBreadCrumbs isLoading={isLoading} />
      <div className="section-container">
        <SearchComponent />
      </div>
      <SearchHeading />
      <SearchResults />
    </>
  );
};

export default SearchPage;
