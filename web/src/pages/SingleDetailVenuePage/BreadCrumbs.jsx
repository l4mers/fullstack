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
import { useEffect } from "react";

function BreadCrumbs({ venueData, isLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { venueSearch } = useSelector((state) => state.venues);

  console.log("venueSearch: ", venueSearch);

  const handleSearch = (venueSearch) => {
    dispatch(setLoadingState(true));

    getAllVenue().then((res) => {
      dispatch(setLoadingState(false));
      let searchResult = res.filter((venue) => {
        let match = false;

        const venueLocation = `${venue.location?.street} ${venue.location?.city}, ${venue.location?.state}, ${venue.location?.country}`;
        const venueSearchParts = venueSearch
          .toLowerCase()
          .split(",")
          .map((part) => part.trim());

        for (let part of venueSearchParts) {
          if (venueLocation.toLowerCase().includes(part)) {
            match = true;
            break;
          }
        }

        return match;
      });

      dispatch(setFilteredVenues(searchResult));
      navigate(`/search/${venueSearch.toLowerCase().split(", ").join("/")}`);
    });
  };

  const handleBreadcrumbClick = (clickedBreadcrumb) => {
    let searchStringArray = [];

    for (let i = 0; i < pages.length; i++) {
      searchStringArray.push(pages[i].name);

      if (pages[i].name === clickedBreadcrumb) {
        break;
      }
    }

    const searchString = searchStringArray.reverse().join(", ");

    dispatch(setVenueSearch(searchString));

    if (!pages.find((page) => page.name === clickedBreadcrumb).current) {
      handleSearch(searchString);
    }
  };

  let pages = [];

  if (venueData) {
    if (venueData.location.country) {
      pages.push({
        name: venueData.location.country,
        current: false,
      });
    }

    if (venueData.location.state) {
      pages.push({
        name: venueData.location.state,
        current: false,
      });
    }

    if (venueData.location.city) {
      pages.push({
        name: venueData.location.city,
        current: false,
      });
    }

    if (venueData.title) {
      pages.push({
        name: venueData.title,
        current: true,
      });
    }
  }

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
          pages.map((page) => (
            <li key={page.name} className="flex-0 flex">
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
                  onClick={() => handleBreadcrumbClick(page.name)}
                  className={`ml-0 whitespace-nowrap text-xs font-medium hover:text-gray-700 sm:ml-4 sm:text-sm ${
                    page.current
                      ? "font-semibold text-secondaryOrange hover:text-primaryRed "
                      : "text-gray-500"
                  }`}
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </NavLink>
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
}

export default BreadCrumbs;
