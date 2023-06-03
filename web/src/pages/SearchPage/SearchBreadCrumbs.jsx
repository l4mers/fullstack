import { HomeIcon } from "@heroicons/react/20/solid";
import { NavLink, useNavigate } from "react-router-dom";
import getAllVenue from "../../api/getAllVenues";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingState } from "../../store/modules/loaderSlice";
import normalizeString from "../../utils/normalizeString";
import {
  setFilteredVenues,
  setVenueSearch,
} from "../../store/modules/venuesSlice";
import transliterate from "../../utils/transliterate";

function SearchBreadCrumbs({ isLoading }) {
  const dispatch = useDispatch();
  const { guestValue } = useSelector((state) => state.venues);
  const { venueSearch } = useSelector((state) => state.venues);
  const venueStartDateString = useSelector((state) => state.venues.startDate);
  const venueEndDateString = useSelector((state) => state.venues.endDate);
  const venueStartDate = venueStartDateString
    ? new Date(venueStartDateString)
    : new Date();
  const venueEndDate = venueEndDateString
    ? new Date(venueEndDateString)
    : new Date();
  const navigate = useNavigate();

  const locationParts = venueSearch.split(",").map((part) => part.trim());

  const handleSearch = (searchTerm, index) => {
    dispatch(setLoadingState(true));

    const newVenueSearch = locationParts
      .slice(0, index + 1)
      .reverse()
      .join(", ");
    dispatch(setVenueSearch(newVenueSearch));

    getAllVenue().then((res) => {
      dispatch(setLoadingState(false));
      let guestValueAdjusted = guestValue || 0;
      let searchResult = res.filter((venue) => {
        let match = false;

        // console.log("venue", venue);
        // console.log("searchTerm", searchTerm);
        // console.log("venueSearch", venueSearch);

        // Check if search term matches location details
        const venueLocation = `${venue.location?.street} ${venue.location?.city}, ${venue.location?.state}, ${venue.location?.country}`;
        if (venueLocation.toLowerCase().includes(searchTerm.toLowerCase())) {
          match = true;
        }
        if (
          (venue.location.city &&
            normalizeString(venue.location.city.toLowerCase()) ===
              searchTerm.toLowerCase()) ||
          (venue.location.country &&
            normalizeString(venue.location.country.toLowerCase()) ===
              searchTerm.toLowerCase()) ||
          (venue.location.state &&
            normalizeString(venue.location.state.toLowerCase()) ===
              searchTerm.toLowerCase()) ||
          (venue.location.street &&
            normalizeString(venue.location.street.toLowerCase()) ===
              searchTerm.toLowerCase())
        ) {
          match = true;
        }

        // Check if guestValue matches or is lower than venue guests
        if (venue.guests < guestValueAdjusted) {
          match = false;
        }

        // Check if the venue is available between the selected dates
        if (venueStartDate && venueEndDate) {
          for (let booking of venue.bookings) {
            let bookingStart = new Date(booking.start);
            let bookingEnd = new Date(booking.end);
            if (
              (bookingStart >= venueStartDate &&
                bookingStart <= venueEndDate) ||
              (bookingEnd >= venueStartDate && bookingEnd <= venueEndDate)
            ) {
              match = false;
              break;
            }
          }
        }

        return match;
      });

      console.log("searchResult", searchResult);
      dispatch(setFilteredVenues(searchResult));
      const path = generatePath(locationParts.slice(0, index + 1).join(","));
      navigate(path);

      // Redirect to the new page with the searchResult
      // You need to implement this part
    });
  };

  const generatePath = (search) => {
    const parts = search.split(",");
    let path = "/search";
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed !== "") {
        path += `/${transliterate(trimmed).toLowerCase().replaceAll(" ", "_")}`;
      }
    }
    return path;
  };

  return (
    <nav
      className="mb-2 flex border-b border-gray-200 bg-white sm:mb-10"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="section-container mx-auto flex w-full flex-wrap gap-2 px-4 py-2 sm:gap-0 sm:space-x-4 sm:px-6 sm:py-0 lg:px-8 "
      >
        <li className="flex">
          <div className="flex items-center">
            <NavLink to="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </NavLink>
          </div>
        </li>
        {isLoading && (
          <li className="flex">
            <div className="flex items-center">
              <svg
                className="hidden h-full w-6 flex-shrink-0 text-gray-200 sm:block"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <div className="ml-0 text-xs font-medium text-primaryRed hover:text-gray-700 sm:ml-4 sm:text-sm ">
                Loading...
              </div>
            </div>
          </li>
        )}
        {!isLoading &&
          locationParts.reverse().map((page, index) => (
            <li key={index} className="flex-0 flex">
              <div className="flex items-center">
                <svg
                  className="hidden h-full w-6 flex-shrink-0 text-gray-200 sm:block"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <NavLink
                  to={page.href}
                  onClick={() => handleSearch(page, index)}
                  className={`ml-0 whitespace-nowrap text-xs font-medium capitalize hover:text-gray-700 sm:ml-4 sm:text-sm ${
                    index === locationParts.length - 1
                      ? "font-semibold text-secondaryOrange hover:text-primaryRed "
                      : "text-gray-500"
                  }`}
                  aria-current={
                    index === locationParts.length - 1 ? "page" : undefined
                  }
                >
                  {page}
                </NavLink>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
}

export default SearchBreadCrumbs;
