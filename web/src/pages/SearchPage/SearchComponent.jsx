import CustomInput from "../../components/FormComponents/CustomInput";
import Suggestions from "../../components/Suggestions";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import RangeCalendar from "../HomePage/RangeCalendar";
import { useSelector } from "react-redux";
import { PrimaryBtn } from "../../components/StyledButtons";
import getAllVenues from "../../api/getAllVenues";
import { useDispatch } from "react-redux";
import { setLoadingState } from "../../store/modules/loaderSlice";
import { useNavigate } from "react-router-dom";
import {
  setFilteredVenues,
  setVenueSearch,
  setVenueEndDate,
  setVenueStartDate,
  setVenueGuestValue,
} from "../../store/modules/venuesSlice";
import normalizeDate from "../../utils/normalizeDate";
import normalizeString from "../../utils/normalizeString";
import transliterate from "../../utils/transliterate";

const SearchComponent = () => {
  const { venueSearch } = useSelector((state) => state.venues);
  const { guestValue } = useSelector((state) => state.venues);
  const venueStartDateString = useSelector((state) => state.venues.startDate);
  const venueEndDateString = useSelector((state) => state.venues.endDate);
  const [guests, setGuests] = useState(guestValue ? guestValue : "");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const venueStartDate = venueStartDateString
    ? new Date(venueStartDateString)
    : new Date();
  const venueEndDate = venueEndDateString
    ? new Date(venueEndDateString)
    : new Date();

  const [startDate, setStartDate] = useState(venueStartDate);
  const [endDate, setEndDate] = useState(venueEndDate);

  const {
    ready,
    value: locationValue,
    suggestions: { status, data },
    setValue: setLocationValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setLocationValue(venueSearch);
  }, [venueSearch]);

  const handleSelect = async (address) => {
    setLocationValue(address, false);
    clearSuggestions();
  };

  const filterVenues = (venues, location, guests, startDate, endDate) => {
    const normalizedLocation = normalizeString(location.toLowerCase());
    const locationParts = normalizedLocation
      .split(/[, ]+/)
      .map((part) => part.trim());

    let filteredVenues = venues.filter((venue) => {
      const venueLocation =
        `${venue.location.country} ${venue.location.state} ${venue.location.city} ${venue.location.zip} ${venue.location.street}`.toLowerCase();
      const normalizedVenueLocation = normalizeString(venueLocation);

      return locationParts.every((part) =>
        normalizedVenueLocation.includes(part)
      );
    });
    filteredVenues = filteredVenues.filter((venue) => venue.guests >= guests);
    filteredVenues = filteredVenues.filter((venue) => {
      return !venue.bookings.some((booking) => {
        const bookingStartDate = normalizeDate(new Date(booking.start));
        const bookingEndDate = normalizeDate(new Date(booking.end));
        const normalizedStartDate = normalizeDate(startDate);
        const normalizedEndDate = normalizeDate(endDate);
        return (
          bookingStartDate < normalizedEndDate &&
          bookingEndDate > normalizedStartDate
        );
      });
    });

    return filteredVenues;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setLoadingState(true));
    setMessage("");

    getAllVenues()
      .then((res) => {
        dispatch(setLoadingState(false));

        if (res) {
          const filteredVenues = filterVenues(
            res,
            locationValue,
            guests,
            startDate,
            endDate
          );

          dispatch(setFilteredVenues(filteredVenues));
          dispatch(setVenueSearch(locationValue));
          dispatch(setVenueStartDate(startDate.toISOString()));
          dispatch(setVenueEndDate(endDate.toISOString()));
          dispatch(setVenueGuestValue(guests));

          if (filteredVenues.length > 0) {
            const path = generatePath(locationValue);
            navigate(path);
          }
        } else {
          setMessage("Request failed. Please try again.");
        }
      })
      .catch((error) => {
        dispatch(setLoadingState(false));
        setMessage("Error. Please try again.");
        console.log("error", error);
      });
  };

  const generatePath = (search) => {
    const parts = search.split(",");
    let path = "/search";
    const reversedParts = parts.reverse();
    for (const part of reversedParts) {
      const trimmed = part.trim();
      if (trimmed !== "") {
        path += `/${transliterate(trimmed).toLowerCase().replaceAll(" ", "_")}`;
      }
    }
    return path;
  };

  return (
    <div className="mb-2 sm:mb-10">
      {message.length > 0 && (
        <p className="font-bold text-red-500">{message}</p>
      )}
      <div className=" flex flex-col flex-wrap gap-2  md:flex-row">
        <div className="min-w-[380px] flex-1">
          <Suggestions
            places={data}
            ready={ready}
            value={locationValue}
            setValue={setLocationValue}
            handleSelect={handleSelect}
            shadow={"input-shadow"}
            marginTop=""
            marginX=""
            rounded="rounded-md"
          />
        </div>
        <div className="flex min-w-[400px] gap-2 md:flex-1">
          <DatePicker
            className="input input-shadow"
            value={startDate}
            onChange={setStartDate}
            format="y-MM-dd"
            minDate={new Date()}
            calendar={<RangeCalendar startDate={startDate} endDate={endDate} />}
          />
          <DatePicker
            className="input input-shadow"
            value={endDate}
            onChange={setEndDate}
            format="y-MM-dd"
            minDate={startDate}
            calendar={<RangeCalendar startDate={startDate} endDate={endDate} />}
          />
        </div>
        <CustomInput
          type="text"
          name="guests"
          placeholder="Guests"
          shadow="input-shadow"
          marginTop=""
          indent="indent-4"
          height="h-12"
          display="hidden"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        <PrimaryBtn
          onClick={handleSearch}
          width="w-auto"
          name="SEARCH"
          flex1="md:flex-1"
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
        <p className="text-sm">Filters</p>
      </div>
    </div>
  );
};

export default SearchComponent;
