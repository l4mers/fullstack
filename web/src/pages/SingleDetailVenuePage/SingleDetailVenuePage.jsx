import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getVenue from "../../api/getVenue";
import BreadCrumbs from "./BreadCrumbs";
import MobileCarousel from "./MobileCarousel";
import ComputerCarousel from "./ComputerCarousel";
import { useSelector, useDispatch } from "react-redux";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Calendar from "react-calendar";
import "../../styles/singleVenueCalendar.css";
import useWindowWidth from "../../hooks/useWindowWidth";
import amenityImages from "../../utils/amenityImages";
import AddToFavorite from "../../components/shared/AddToFavorite";
import RemoveFromFavorite from "../../components/shared/RemoveFromFavorite";
import postBooking from "../../api/postBooking";
import { setSelectedView } from "../../store/modules/displayedDashboardViewSlice";

const SingleDetailVenuePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [venueData, setVenueData] = useState(null);
  const { isLoading } = useSelector((state) => state.loader);
  const [isFavorite, setIsFavorite] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const windowWidth = useWindowWidth();
  const [isPickingStartDate, setIsPickingStartDate] = useState(true);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API;
  const [open, setOpen] = useState(false);
  const [removeAsFavorite, setRemoveAsFavorite] = useState(false);
  const [maxToDate, setMaxToDate] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  const isMobileView = windowWidth <= 768;

  const bookedDates = venueData?.bookings.map((booking) => {
    const startDate = new Date(booking.start);
    const endDate = new Date(booking.end);

    // Add one day to the start date
    startDate.setDate(startDate.getDate() - 1);

    return {
      start: startDate,
      end: endDate,
    };
  });

  async function handleBooking() {
    dispatch(setSelectedView("Upcoming Stays"));
    const bookingData = {
      start: fromDate,
      end: toDate,
    };

    try {
      if (fromDate && toDate !== null) {
        await postBooking(venueData.id, bookingData);
        setBookingMessage(false);
        console.log("Data sent to the server!");
        navigate("/dashboard");
      } else {
        setBookingMessage(true);
      }
    } catch (error) {
      console.error(error);
      setBookingMessage(true);
    }
  }

  const isDateBooked = (date) => {
    return bookedDates.some((range) => {
      return date >= range.start && date <= range.end;
    });
  };

  console.log("bookedDates: ", bookedDates);
  console.log("fromDate: ", fromDate);
  console.log("toDate: ", toDate);

  useEffect(() => {
    const existingFavorites =
      JSON.parse(localStorage.getItem("Favorites")) || [];
    const existingCollections =
      JSON.parse(localStorage.getItem("collections")) || [];

    const isVenueInFavorites = existingFavorites.some(
      (favorite) => favorite.id === venueData?.id
    );
    const isVenueInCollections = existingCollections.some((collection) =>
      collection.venues.some((venue) => venue.id === venueData?.id)
    );

    setIsFavorite(isVenueInFavorites || isVenueInCollections);
  }, [venueData]);

  const street = venueData?.location.street?.replace(/ /g, "+") || "";
  const city = venueData?.location.city?.replace(/ /g, "+") || "";
  const state = venueData?.location.state?.replace(/ /g, "+") || "";

  const highlightRange = ({ date, view }) => {
    if (view !== "month" || !fromDate || !toDate) {
      return null;
    }

    if (date >= fromDate && date <= toDate) {
      return "rangeHighlight";
    }
  };

  const calculateDateDifference = (date1, date2) => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = Math.abs(date2 - date1);
    let differenceInDays = Math.ceil(
      differenceInMilliseconds / oneDayInMilliseconds
    );

    if (differenceInDays === 0) {
      differenceInDays = 1;
    }

    return differenceInDays;
  };

  function formatDate(date) {
    if (!date) return "";

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek} ${month} ${day}, ${year}`;
  }

  const numberOfDays = toDate ? calculateDateDifference(fromDate, toDate) : 1;
  console.log("number of days:", numberOfDays);
  console.log("fromDate:", fromDate);

  useEffect(() => {
    dispatch(getVenue(id, isAuthenticated))
      .then((data) => {
        setVenueData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch venue data:", error);
      });
  }, [id, dispatch]);

  useEffect(() => {
    if (fromDate && venueData) {
      const sortedBookings = [...venueData.bookings].sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      const nextBooking = sortedBookings.find(
        (booking) => new Date(booking.start) > fromDate
      );
      setMaxToDate(nextBooking ? new Date(nextBooking.start) : null);
    }
  }, [fromDate, venueData]);

  console.log("venueData", venueData);

  return (
    <>
      {!isLoading && venueData && <BreadCrumbs venueData={venueData} />}
      {!isLoading && venueData && (
        <>
          <div className="mx-auto w-full overflow-hidden sm:max-w-[1440px]">
            <div className=" relative lg:hidden">
              <MobileCarousel slides={venueData.media} />
            </div>
            <ComputerCarousel venueData={venueData} />
          </div>
          <main className=" mt-4 sm:mt-10">
            <div className="section-container flex items-baseline gap-4">
              <h2 className="mb-2">{venueData.title}</h2>
              {!isFavorite && (
                <FaRegHeart
                  onClick={() => setOpen(true)}
                  className="h-8 w-8 cursor-pointer text-primaryRed"
                />
              )}
              {isFavorite && (
                <FaHeart
                  onClick={() => setRemoveAsFavorite(true)}
                  className="h-8 w-8 cursor-pointer text-primaryRed"
                />
              )}
              <AddToFavorite
                venueData={venueData}
                open={open}
                setOpen={setOpen}
                setIsFavorite={setIsFavorite}
              />
              <RemoveFromFavorite
                open={removeAsFavorite}
                setOpen={setRemoveAsFavorite}
                setAddToFavoriteOpen={setOpen}
                id={venueData.id}
                setIsFavorite={setIsFavorite}
              />
            </div>
            <div className="mb-4 h-0.5 w-full bg-primaryRed sm:mb-10"></div>
            <div className="section-container">
              <div className="mb-4 flex flex-wrap justify-between gap-2 text-sm font-bold sm:mb-10 md:text-xl lg:font-semibold">
                <div className="mr-10">
                  {venueData.venueProfileRatings.length === 0 && (
                    <div>Currently no rating</div>
                  )}
                </div>
                <div className="mr-10">{venueData.squareMeter}m²</div>
                <div className="mr-10">{venueData.price}kr /night</div>
                <div>
                  {venueData.beds} beds · {venueData.bathrooms} bathrooms
                </div>
              </div>
              <div>{venueData.description}</div>
              <div className="mb-4 mt-4 flex gap-10 sm:mb-10 sm:mt-10">
                <div className="w-full flex-1">
                  <div className="flex gap-2">
                    <p className="font-semibold">{formatDate(fromDate)} </p>
                    {isMobileView && (
                      <>
                        {fromDate && <p>-</p>}
                        <p className="font-semibold"> {formatDate(toDate)}</p>
                      </>
                    )}
                  </div>
                  <Calendar
                    onChange={(date) => {
                      if (isMobileView) {
                        if (isPickingStartDate) {
                          setFromDate(date);
                          setToDate(null); // reset toDate when fromDate is changed
                          setMaxToDate(null); // reset maxToDate when fromDate is changed
                          setIsPickingStartDate(false);
                        } else {
                          if (date >= fromDate) {
                            setToDate(date);
                            setIsPickingStartDate(true);
                          } else {
                            alert("End date should be after the start date.");
                          }
                        }
                      } else {
                        setFromDate(date);
                        setToDate(null); // reset toDate when fromDate is changed
                        setMaxToDate(null); // reset maxToDate when fromDate is changed
                      }
                    }}
                    value={isPickingStartDate ? fromDate : toDate}
                    className="w-full rounded border-none shadow-xl"
                    minDate={isMobileView ? fromDate || new Date() : new Date()}
                    tileClassName={highlightRange}
                    showWeekNumbers={!isMobileView ? true : false}
                    tileDisabled={
                      ({ date, view }) => view === "month" && isDateBooked(date) // disable if date is booked
                    }
                  />
                </div>
                {!isMobileView && (
                  <div className="w-full flex-1 ">
                    <p className="font-semibold">{formatDate(toDate)}</p>
                    <Calendar
                      onChange={setToDate}
                      value={toDate}
                      minDate={fromDate || new Date()}
                      maxDate={maxToDate}
                      className="flex-1 rounded border-none shadow-xl"
                      tileClassName={highlightRange}
                      goToRangeStartOnSelect={true}
                      showWeekNumbers={true}
                      tileDisabled={
                        ({ date, view }) =>
                          view === "month" && isDateBooked(date) // disable if date is booked
                      }
                    />
                  </div>
                )}
              </div>
              {bookingMessage && (
                <p className="mb-6 text-center text-lg font-bold text-red-500">
                  Error 😞 Please select "from" and "to" date and try again!
                </p>
              )}
              <div className="flex items-center gap-2 sm:justify-center sm:gap-10">
                <div className="relative overflow-hidden">
                  <button
                    onClick={handleBooking}
                    className="before:buttonCTAeffect h-[42px] w-full rounded-bl-[4px] rounded-br-[24px] rounded-tl-[24px] rounded-tr-[4px] border border-textBlack px-8 font-carena leading-[42px] transition duration-500 before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-center before:scale-x-0 before:rounded-bl-[24px] before:rounded-br-[4px] before:rounded-tl-[4px] before:rounded-tr-[24px] before:bg-textBlack before:transition-transform before:duration-300 after:overflow-hidden hover:bg-textBlack  hover:text-background hover:before:-scale-x-100 smallScreen:w-full smallScreen:px-[66px] lg:text-xl"
                  >
                    Book
                  </button>
                </div>
                <div>
                  <p>{venueData.price}kr /night</p>
                  <p className="text-lg font-semibold sm:text-xl">
                    {numberOfDays} nights, {venueData.price * numberOfDays}kr
                    total
                  </p>
                </div>
              </div>
              <section className="mt-10 sm:mt-20">
                <p className="font-semibold">
                  {venueData.location.street + ","}{" "}
                  {venueData.location.city + ","}{" "}
                  {venueData.location.state + ","} {venueData.location.country}
                </p>
                <div className="w-full">
                  <img
                    className="min-h-[200px] w-full rounded object-cover"
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${street},${city},${state}&zoom=${
                      isMobileView ? "13" : "11"
                    }&size=700x250&scale=2&maptype=roadmap
                  &markers=color:0xFD7E40%7Clabel:%7C59.4334664,17.8277448
                  &key=${googleMapsApiKey}`}
                    alt=""
                  />
                </div>
              </section>
              <section className="mt-4 sm:mt-10">
                <h3 className="mb-4 text-xl leading-[44px] sm:text-[32px]">
                  Amenities
                </h3>
                <div className="flex flex-wrap">
                  {venueData.amenities.map((amenity, index) => {
                    if (amenityImages[amenity]) {
                      return (
                        <div
                          key={index}
                          className="mb-4 flex w-1/2 flex-col items-center gap-1 smallScreen:flex-row smallScreen:gap-4 md:w-1/3"
                        >
                          <img
                            className="w-8"
                            src={amenityImages[amenity]}
                            alt={amenity}
                            key={amenity}
                          />
                          <p className="text-center font-semibold smallScreen:text-start">
                            {amenity}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default SingleDetailVenuePage;
