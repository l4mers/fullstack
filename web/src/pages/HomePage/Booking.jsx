import { useState } from "react";
import MainFormComponent from "./MainFormComponent";
import DatePicker from "react-date-picker";
import RangeCalendar from "./RangeCalendar";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "../../styles/datePickerStyles.css";
import CustomInput from "../../components/FormComponents/CustomInput";
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
import usePlacesAutocomplete from "use-places-autocomplete";
import Suggestions from "../../components/Suggestions";
import normalizeDate from "../../utils/normalizeDate";
import transliterate from "../../utils/transliterate";
import normalizeString from "../../utils/normalizeString";

const Booking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch();
  const [guestValue, setGuestValue] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSelect = async (address) => {
    setLocationValue(address, false);
    clearSuggestions();
  };

  const {
    ready,
    value: locationValue,
    suggestions: { status, data },
    setValue: setLocationValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

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
      .then((response) => {
        dispatch(setLoadingState(false));

        if (response) {
          const filteredVenues = filterVenues(
            response,
            locationValue,
            guestValue,
            startDate,
            endDate
          );

          dispatch(setFilteredVenues(filteredVenues));
          dispatch(setVenueSearch(locationValue));
          dispatch(setVenueStartDate(startDate.toISOString()));
          dispatch(setVenueEndDate(endDate.toISOString()));
          dispatch(setVenueGuestValue(guestValue));

          if (filteredVenues.length > 0) {
            const path = generatePath(locationValue);
            navigate(path);
          } else {
            setMessage("No venues matched your search. 👀");
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
    <>
      <MainFormComponent>
        <div className="flex flex-col gap-2 rounded-b md:bg-white md:px-6 md:py-9">
          {message.length > 0 && (
            <p className="font-bold text-red-500">{message}</p>
          )}
          <div className="flex flex-col gap-2 md:flex-row">
            <div className=" flex-1">
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
            <div className="flex gap-2 md:flex-1">
              <DatePicker
                className="input input-shadow"
                value={startDate}
                onChange={setStartDate}
                format="y-MM-dd"
                minDate={new Date()}
                calendar={
                  <RangeCalendar startDate={startDate} endDate={endDate} />
                }
              />
              <DatePicker
                className="input input-shadow"
                value={endDate}
                onChange={setEndDate}
                format="y-MM-dd"
                minDate={startDate}
                calendar={
                  <RangeCalendar startDate={startDate} endDate={endDate} />
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <CustomInput
              flex1="md:flex-1"
              type="text"
              name="guests"
              placeholder="Guests"
              shadow="input-shadow"
              marginTop=""
              indent="indent-4"
              height="h-12"
              display="hidden"
              onChange={(e) => setGuestValue(e.target.value)}
            />
            <PrimaryBtn
              width="w-full"
              name="SEARCH"
              flex1="md:flex-1"
              onClick={handleSearch}
            />
          </div>
        </div>
      </MainFormComponent>
    </>
  );
};

export default Booking;
