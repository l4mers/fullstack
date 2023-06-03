import getUserVenueBookings from "../../api/getUserVenueBookings";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConfirmedGuests = () => {
  const dispatch = useDispatch();
  const [userVenueBookingData, setUserVenueBookingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserVenueBookings = async () => {
      const response = await dispatch(getUserVenueBookings());
      setUserVenueBookingData(response);
    };
    fetchUserVenueBookings();
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().substring(0, 10);
  };

  return (
    <div className="section-container divide-gray-[#D9D9D9] divide-y">
      {userVenueBookingData &&
        userVenueBookingData.map((booking, index) => {
          const formattedStart = formatDate(booking.bookings.start);
          const formattedEnd = formatDate(booking.bookings.end);

          return (
            <div
              key={index}
              className="profileSmallScreen: box-border flex flex-col gap-4 py-4"
            >
              <h3 className="text-xl font-bold capitalize text-primaryRed md:text-2xl ">
                {booking.venueTitel}
              </h3>
              <div className="flex flex-col justify-between profileSmallScreen:flex-row">
                <div className="flex h-full flex-col justify-between ">
                  <div>
                    <div className="flex gap-2 ">
                      <div className="h-12 w-12 overflow-hidden rounded ">
                        <img
                          className="h-full w-full object-cover"
                          src={booking.bookings.booker.avatar}
                        />
                      </div>
                      <p className="mb-1 flex  flex-col justify-between font-bold text-primaryRed profileSmallScreen:mb-0">
                        <span>Guest: </span>
                        <span className="w-max font-normal text-textBlack">
                          {booking.bookings.booker.name}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex h-full flex-col justify-between profileSmallScreen:text-end ">
                  <div>
                    <p className="mb-1 profileSmallScreen:mb-0">
                      <span className="font-bold text-primaryRed ">
                        Arrival:{" "}
                      </span>
                      {formattedStart}
                    </p>
                    <p>
                      <span className="font-bold text-primaryRed">
                        Departure:{" "}
                      </span>
                      {formattedEnd}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="w-max rounded-lg border-2 border-secondaryOrange bg-secondaryOrange px-4 py-2.5 text-sm font-bold text-white outline-offset-1 outline-textBlack hover:bg-[#EF6623] focus:outline">
                  MESSAGE HOST
                </button>
                <button
                  onClick={() => {
                    navigate(`/venue/${booking.venueId}`);
                  }}
                  className=" w-max rounded-lg border-2 border-primaryRed bg-transparent px-4 py-2.5 text-sm font-bold text-primaryRed outline-offset-1 outline-textBlack hover:border-secondaryOrange hover:text-secondaryOrange focus:outline"
                >
                  MORE INFO
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ConfirmedGuests;
