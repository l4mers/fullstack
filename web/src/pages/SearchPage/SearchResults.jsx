import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import AddToFavorite from "../../components/shared/AddToFavorite";
import RemoveFromFavorite from "../../components/shared/RemoveFromFavorite";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SearchResults = () => {
  const { filteredVenues } = useSelector((state) => state.venues);
  const { startDate } = useSelector((state) => state.venues);
  const { endDate } = useSelector((state) => state.venues);
  const [open, setOpen] = useState(false);
  const [removeOpen, setRemoveOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [favoriteVenues, setFavoriteVenues] = useState([]);
  const [totalNights, setTotalNights] = useState(0);

  const calculateNumberOfNights = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const differenceInMs = endDate - startDate;
    const differenceInDays = Math.round(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };

  const generateVenueUrl = (venueId) => {
    return `${location.pathname}/venue/${venueId}`;
  };

  useEffect(() => {
    setTotalNights(calculateNumberOfNights(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("Favorites")) || [];
    const existingCollections =
      JSON.parse(localStorage.getItem("collections")) || [];

    const isFavoriteArray = filteredVenues.map((venue) =>
      existingFavorites.some((favorite) => favorite.id === venue.id)
    );

    const isCollectionArray = filteredVenues.map((venue) =>
      existingCollections.some((collection) =>
        collection.venues.some(
          (collectionVenue) => collectionVenue.id === venue.id
        )
      )
    );

    setFavoriteVenues(isFavoriteArray.map((v, i) => v || isCollectionArray[i]));
  }, [filteredVenues, open]);

  const truncateTitle = (title, length = 17) => {
    if (title.length > length) {
      return `${title.substring(0, length)}..`;
    }
    return title;
  };

  return (
    <>
      <div className="section-container grid grid-cols-2 gap-x-6 gap-y-12">
        {filteredVenues.map((venue, index) => (
          <div
            key={index}
            className="h-fit rounded-b-3xl border-b border-l border-r border-[#9A9A9A] border-opacity-40 px-2 pb-2"
          >
            <NavLink to={generateVenueUrl(venue.id)}>
              <div className="aspect-video max-h-[256px] w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={venue.coverPhoto}
                />
              </div>
            </NavLink>
            <div className="flex flex-col justify-between gap-12 px-4 pb-2.5 pt-[18px]">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <h3
                    title={venue.title}
                    className="w-3/4 cursor-default text-xl font-bold"
                  >
                    {truncateTitle(venue.title)}
                  </h3>
                  <div className=" flex gap-1.5 text-sm">
                    <p>{venue.beds} beds</p>
                    <span>·</span>
                    <p>{venue.bathrooms ? venue.bathrooms : 0} bathrooms</p>
                  </div>
                </div>
                {!favoriteVenues[index] && (
                  <FaRegHeart
                    onClick={() => {
                      setSelectedVenue(venue);
                      setOpen(true);
                    }}
                    className="h-8 w-8 cursor-pointer text-primaryRed"
                  />
                )}
                {favoriteVenues[index] && (
                  <FaHeart
                    onClick={() => {
                      setSelectedVenue(venue);
                      setRemoveOpen(true);
                    }}
                    className="h-8 w-8 cursor-pointer text-primaryRed"
                  />
                )}
              </div>
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-2">
                  <img src="/images/starsor.svg" />
                  <p className="text-sm font-bold">
                    {!venue.rating && "No rating yet"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">{venue.price} /night</p>
                  <p className="text-sm font-light underline">
                    {totalNights * venue.price === 0
                      ? venue.price
                      : totalNights * venue.price}
                    kr total
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddToFavorite
        setIsFavorite={setFavoriteVenues}
        venueData={selectedVenue}
        open={open}
        setOpen={setOpen}
      />
      <RemoveFromFavorite
        id={selectedVenue ? selectedVenue.id : null}
        open={removeOpen}
        setOpen={setRemoveOpen}
        setAddToFavoriteOpen={setOpen}
        setIsFavorite={setFavoriteVenues}
      />
    </>
  );
};

export default SearchResults;
