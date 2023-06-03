import getUserBookings from "../../api/getUserBookings";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpcomingStays = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userBookingData, setUserBookingData] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const response = await dispatch(getUserBookings());
      setUserBookingData(response);
    };
    fetchUserBookings();
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().substring(0, 10);
  };

  return (
    <div className="section-container divide-gray-[#D9D9D9] divide-y">
      {userBookingData &&
        userBookingData.map((booking, index) => {
          const formattedStart = formatDate(booking.start);
          const formattedEnd = formatDate(booking.end);

          return (
            <div
              key={index}
              className="profileSmallScreen: box-border flex flex-col gap-4 py-4"
            >
              <div className="flex flex-col justify-between profileSmallScreen:flex-row">
                <div className="flex h-full flex-col justify-between ">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold capitalize text-primaryRed profileSmallScreen:mb-0">
                      {booking.venue.title}
                    </h3>
                    <p className="mb-1 font-bold text-primaryRed profileSmallScreen:mb-0">
                      Host:{" "}
                      <span className="font-normal text-textBlack">
                        {booking.venue.owner.name}
                      </span>
                    </p>
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
                    navigate(`/venue/${booking.venue.venueId}`);
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

export default UpcomingStays;
