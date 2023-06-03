import { useDispatch, useSelector } from "react-redux";
import RegisterProgression from "./RegisterProgression";
import { SecondaryBtn } from "../../components/StyledButtons";
import {
  incrementStage,
  decrementStage,
  submitAttempted,
} from "../../store/modules/displayedVenueStageSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Stage0 from "./Stage0";
import { useEffect, useState } from "react";
import postVenue from "../../api/postVenueApi";
import GeneralMessage from "./GeneralMessage";

const RegisterVenue = () => {
  const navigate = useNavigate();
  const currentStage = useSelector((state) => state.displayedVenueStage.stage);
  const stageData = useSelector((state) => state.displayedVenueStage.stageData);
  const { allStagesAreValid } = useSelector(
    (state) => state.displayedVenueStage
  );
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  let postData = {};

  if (stageData && allStagesAreValid) {
    postData = {
      squareMeter: stageData.stage1.m2,
      beds: stageData.stage1.beds,
      bathrooms: stageData.stage1.bathrooms,
      guests: stageData.stage1.guests,
      title: stageData.stage2.title,
      description: stageData.stage2.description,
      street: stageData.stage3.street,
      city: stageData.stage3.city,
      country: stageData.stage3.country,
      zip: stageData.stage3.zipCode,
      lat: stageData.stage3.lat,
      lng: stageData.stage3.lng,
      placeId: stageData.stage3.place_id,
      state: stageData.stage3.state,
      amenities: stageData.stage4,
      price: stageData.stage5.price,
      media: Object.values(stageData.stage6)
        .filter((photo) => photo.img)
        .map((photo) => ({
          image: photo.img,
          description: photo.description,
        })),
    };
  }

  console.log("postData: ", postData);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const stageToPath = {
    1: "essential-information",
    2: "title-and-description",
    3: "location",
    4: "amenities",
    5: "pricing",
    6: "images",
  };

  const increment = () => {
    dispatch(incrementStage());
    navigate(`/registerVenue/${stageToPath[currentStage + 1]}`);
  };

  const decrement = () => {
    dispatch(decrementStage());
    if (currentStage - 1 === 0) {
      navigate(`/registerVenue`);
    } else {
      navigate(`/registerVenue/${stageToPath[currentStage - 1]}`);
    }
  };

  useEffect(() => {
    if (currentStage !== 0) {
      navigate(`/registerVenue/${stageToPath[currentStage]}`);
    } else {
      navigate(`/registerVenue`);
    }
  }, [navigate]);

  const renderButtonName = () => {
    switch (currentStage) {
      case 0:
        return "Begin";
      case 6:
        return "Submit";
      default:
        return "Next";
    }
  };

  return (
    <div className="section-container relative flex min-h-[calc(100vh-179.18px)] flex-col justify-between gap-6 md:min-h-[calc(100vh-111.99px)]">
      {currentStage === 0 && <Stage0 />}
      <div>
        <div className="sm:mt-10 sm:flex sm:justify-center sm:gap-20">
          {currentStage > 0 && (
            <div className="sm:mt-20 ">
              <RegisterProgression />
            </div>
          )}
          <form className="max-w-3xl sm:flex-1" onSubmit={handleSubmit}>
            <Outlet />
          </form>
        </div>
      </div>
      {error && <GeneralMessage errors={error} />}
      <div
        className={`${
          currentStage !== 0 ? "justify-between" : "justify-end"
        } mb-6  flex`}
      >
        {currentStage !== 0 && (
          <button
            onClick={() => {
              dispatch(decrement());
            }}
            className="rounded-md px-8 font-semibold text-textBlack underline hover:bg-gray-200"
          >
            Back
          </button>
        )}

        <SecondaryBtn
          width="px-8"
          name={renderButtonName()}
          onClick={
            currentStage <= 5
              ? () => {
                  dispatch(increment());
                }
              : () => {
                  postVenue(postData)
                    .then((venueId) => {
                      console.log("Post succeeded:", venueId);
                      dispatch(submitAttempted(false));
                      navigate(`/venue/${venueId}`);
                      // Handle success (e.g., navigate to a different page)
                    })
                    .catch((error) => {
                      console.error("Post failed:", error);
                      setError(error);
                      dispatch(submitAttempted(true));
                      // Handle error (e.g., show a message to the user)
                    });
                }
          }
        />
      </div>
    </div>
  );
};

export default RegisterVenue;
