import { useSelector } from "react-redux";

const SearchHeading = () => {
  const { venueSearch } = useSelector((state) => state.venues);

  return (
    <div className="mb-10">
      <h2 className="section-container">{venueSearch}</h2>
      <div className="mt-2 h-0.5 w-full bg-primaryRed"></div>
    </div>
  );
};

export default SearchHeading;
