import StageTemplate from "./StageTemplate";
import { FaPlusCircle } from "react-icons/fa";
import AddImageModal from "./AddImageModal";
import { useState } from "react";
import { useSelector } from "react-redux";

const Stage6 = () => {
  const [open, setOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const stageData = useSelector(
    (state) => state.displayedVenueStage.stageData.stage6
  );

  // console.log(stageData.coverPhoto);

  const handleButtonClick = (button) => {
    setClickedButton(button);
    setOpen(true);
  };

  return (
    <div>
      <StageTemplate stageNumber={6} stageTitle={"Images"} />
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-2xl font-medium">Cover Photo</p>
          <button
            onClick={() => handleButtonClick("coverPhoto")}
            type="button"
            className={`group relative block aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed  p-12 text-center  focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1`}
          >
            <>
              {" "}
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange " />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.coverPhoto.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.coverPhoto.img == null && <p>Add cover photo</p>}
              </span>
            </>
            {stageData.coverPhoto.img !== null &&
              stageData.coverPhoto.img &&
              stageData.coverPhoto.img && (
                <img
                  className="absolute left-0 top-0 h-full w-full object-cover "
                  src={
                    stageData.coverPhoto.img !== null &&
                    stageData.coverPhoto.img &&
                    stageData.coverPhoto.img
                  }
                  alt=""
                />
              )}
            {stageData.coverPhoto.img !== null && stageData.coverPhoto.img && (
              <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                Edit
              </button>
            )}
          </button>
        </div>
        <div>
          <p className="mb-2 text-2xl font-medium">Additional Images</p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleButtonClick("photo1")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo1.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo1.img == null && <p>Add image</p>}
              </span>
              {stageData.photo1.img !== null &&
                stageData.photo1.img &&
                stageData.photo1.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo1.img !== null &&
                      stageData.photo1.img &&
                      stageData.photo1.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo1.img !== null && stageData.photo1.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
            <button
              onClick={() => handleButtonClick("photo2")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo2.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo2.img == null && <p>Add image</p>}
              </span>
              {stageData.photo2.img !== null &&
                stageData.photo2.img &&
                stageData.photo2.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo2.img !== null &&
                      stageData.photo2.img &&
                      stageData.photo2.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo2.img !== null && stageData.photo2.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleButtonClick("photo3")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo3.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo3.img == null && <p>Add image</p>}
              </span>
              {stageData.photo3.img !== null &&
                stageData.photo3.img &&
                stageData.photo3.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo3.img !== null &&
                      stageData.photo3.img &&
                      stageData.photo3.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo3.img !== null && stageData.photo3.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
            <button
              onClick={() => handleButtonClick("photo4")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo4.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo4.img == null && <p>Add image</p>}
              </span>
              {stageData.photo4.img !== null &&
                stageData.photo4.img &&
                stageData.photo4.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo4.img !== null &&
                      stageData.photo4.img &&
                      stageData.photo4.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo4.img !== null && stageData.photo4.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleButtonClick("photo5")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo5.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo5.img == null && <p>Add image</p>}
              </span>
              {stageData.photo5.img !== null &&
                stageData.photo5.img &&
                stageData.photo5.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo5.img !== null &&
                      stageData.photo5.img &&
                      stageData.photo5.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo5.img !== null && stageData.photo5.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
            <button
              onClick={() => handleButtonClick("photo6")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo6.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo6.img == null && <p>Add image</p>}
              </span>
              {stageData.photo6.img !== null &&
                stageData.photo6.img &&
                stageData.photo6.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo6.img !== null &&
                      stageData.photo6.img &&
                      stageData.photo6.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo6.img !== null && stageData.photo6.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleButtonClick("photo7")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo7.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo7.img == null && <p>Add image</p>}
              </span>
              {stageData.photo7.img !== null &&
                stageData.photo7.img &&
                stageData.photo7.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo7.img !== null &&
                      stageData.photo7.img &&
                      stageData.photo7.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo7.img !== null && stageData.photo7.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
            <button
              onClick={() => handleButtonClick("photo8")}
              type="button"
              className="group relative block aspect-video w-full flex-1 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 "
            >
              <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {stageData.photo8.img !== null && (
                  <p>The URL to your image is probably broken</p>
                )}
                {stageData.photo8.img == null && <p>Add image</p>}
              </span>
              {stageData.photo8.img !== null &&
                stageData.photo8.img &&
                stageData.photo8.img && (
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover "
                    src={
                      stageData.photo8.img !== null &&
                      stageData.photo8.img &&
                      stageData.photo8.img
                    }
                    alt=""
                  />
                )}
              {stageData.photo8.img !== null && stageData.photo8.img && (
                <button className="absolute right-5 top-3 z-10 rounded bg-primaryRed px-4 py-1 font-semibold text-white transition-colors duration-300 group-hover:bg-[#e85159]">
                  Edit
                </button>
              )}
            </button>
          </div>
        </div>
      </div>
      <AddImageModal
        successMessage="Hooray! 😄 Image upload complete!"
        imageRemovedMessage="Image removed 🙂"
        open={open}
        setOpen={setOpen}
        clickedButton={clickedButton}
      />
    </div>
  );
};

export default Stage6;
