import { CheckIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  setStage,
  setAllStagesAreValid,
} from "../../store/modules/displayedVenueStageSlice";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function RegisterProgression() {
  const currentStage = useSelector((state) => state.displayedVenueStage.stage);
  const stageData = useSelector((state) => state.displayedVenueStage.stageData);
  const submitAttempted = useSelector(
    (state) => state.displayedVenueStage.submitAttempted
  );

  const dispatch = useDispatch();

  const isValid = (stage) => {
    console.log("StageData: ", stageData);
    if (!stageData) {
      return false;
    }
    if (stageData) {
      switch (stage) {
        case 1:
          const { m2, beds, bathrooms, guests } = stageData.stage1;
          return m2 && beds && bathrooms && guests;
        case 2:
          const { title, description } = stageData.stage2;
          return title && description;
        case 3:
          const { street, city, country, zipCode, lat, lng, place_id } =
            stageData.stage3;
          return street && city && country && zipCode && lat && lng && place_id;
        case 4:
          return true;
        case 5:
          const { price } = stageData.stage5;
          return price;
        case 6:
          const photos = Object.values(stageData.stage6);

          const firstPhotoExists = photos[0]?.img;

          const atLeastFourMorePhotos =
            photos.slice(1).filter((photo) => photo.img).length >= 4;

          return firstPhotoExists && atLeastFourMorePhotos;
        default:
          return false;
      }
    }
  };

  const areAllStagesValid = () => {
    let valid = true;
    for (let i = 1; i <= 6; i++) {
      if (!isValid(i)) {
        valid = false;
        console.log("stagezzzzz ", i, " is not valid");
        break;
      }
    }
    return dispatch(setAllStagesAreValid(valid));
  };

  console.log("Are all stages valid? ", areAllStagesValid().payload);

  let stages = [
    {
      stage: 1,
      href: "/registerVenue/essential-information",
    },
    {
      stage: 2,
      href: "/registerVenue/title-and-description",
    },
    {
      stage: 3,
      href: "/registerVenue/location",
    },
    {
      stage: 4,
      href: "/registerVenue/amenities",
    },
    {
      stage: 5,
      href: "/registerVenue/pricing",
    },
    {
      stage: 6,
      href: "/registerVenue/images",
    },
  ];

  stages = stages.map((stage) => {
    if (stage.stage < currentStage) {
      return {
        ...stage,
        status: isValid(stage.stage) ? "complete" : "incomplete",
      };
    } else if (stage.stage === currentStage) {
      return {
        ...stage,
        status:
          submitAttempted && !isValid(stage.stage) ? "incomplete" : "current",
      };
    } else {
      return { ...stage, status: "upcoming" };
    }
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="my-6 flex items-center justify-center sm:h-full sm:flex-col sm:justify-between sm:gap-10"
      >
        {stages.map((stage, stageIdx) => (
          <li
            key={stage.stage}
            onClick={() => dispatch(setStage(stageIdx + 1))}
            className={classNames(
              stageIdx !== stages.length - 1
                ? "pr-4 smallScreen:pr-8 sm:pr-0"
                : "",
              "relative"
            )}
          >
            {stage.status === "complete" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center sm:inset-auto sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:justify-center"
                  aria-hidden="true"
                >
                  <div
                    className={`h-0.5 w-full bg-[#0091AE] sm:-z-10 sm:w-0.5 ${
                      stageIdx === 0 ? "sm:h-auto" : "sm:h-[100px]"
                    }`}
                  />
                </div>
                <NavLink
                  to={stage.href}
                  className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#0091AE] hover:bg-[#34A9C0] sm:z-10"
                >
                  <CheckIcon
                    className="h-5 w-5 text-white "
                    aria-hidden="true"
                  />
                  <span className="sr-only">{stage.stage}</span>
                </NavLink>
              </>
            ) : stage.status === "current" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center sm:inset-auto sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <div
                    className={`h-0.5 w-full bg-gray-200 sm:-z-10 sm:h-[100px] sm:w-0.5 ${
                      stageIdx === 0 ? "sm:h-auto" : "sm:h-[100px]"
                    }`}
                  />
                </div>
                <NavLink
                  to={stage.href}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0091AE] bg-white"
                  aria-current="stage"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-[#0091AE]"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{stage.stage}</span>
                </NavLink>
              </>
            ) : stage.status === "incomplete" ? (
              <>
                <div
                  className="absolute inset-0 flex items-center sm:inset-auto sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:justify-center"
                  aria-hidden="true"
                >
                  <div
                    className={`h-0.5 w-full bg-[#0091AE] sm:-z-10 sm:w-0.5 ${
                      stageIdx === 0 ? "sm:h-auto" : "sm:h-[100px]"
                    }`}
                  />
                </div>
                <NavLink
                  to={stage.href}
                  className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primaryRed hover:bg-[#ea676e] sm:z-10"
                >
                  <FaTimes className="h-5 w-5 text-white " aria-hidden="true" />
                  <span className="sr-only">{stage.stage}</span>
                </NavLink>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center sm:inset-auto sm:bottom-0 sm:left-1/2 sm:-z-10 sm:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <div
                    className={`h-0.5 w-full bg-gray-200 sm:-z-10 sm:h-[100px] sm:w-0.5 ${
                      stageIdx === 0 ? "sm:h-auto" : "sm:h-[100px]"
                    }`}
                  />
                </div>
                <NavLink
                  to={stage.href}
                  className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{stage.stage}</span>
                </NavLink>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
