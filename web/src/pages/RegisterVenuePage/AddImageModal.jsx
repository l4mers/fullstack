import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import CustomInput from "../../components/FormComponents/CustomInput";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStageData } from "../../store/modules/displayedVenueStageSlice";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const AddImageModal = ({ open, setOpen, clickedButton }) => {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const stageData = useSelector(
    (state) => state.displayedVenueStage.stageData.stage6
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isSameValue, setIsSameValue] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [imageDescription, setImageDescription] = useState("");

  useEffect(() => {
    if (
      (showMessage && stageData[clickedButton]?.img) ||
      (!imageUrl && stageData[clickedButton]?.img)
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [stageData, clickedButton, showMessage]);

  // console.log('imageUrl: ', imageUrl);
  // console.log(
  //   'stageData[clickedButton]: ',
  //   stageData[clickedButton]
  // );

  useEffect(() => {
    if (
      stageData[clickedButton]?.img === imageUrl ||
      (stageData[clickedButton]?.img === null && imageUrl === "")
    ) {
      setIsSameValue(true);
    } else {
      setIsSameValue(false);
    }
  }, [stageData, clickedButton, imageUrl]);

  useEffect(() => {
    if (open && stageData && stageData[clickedButton].img) {
      setImageUrl(stageData[clickedButton].img);
      setImageDescription(stageData[clickedButton].description);
    } else if (open) {
      setImageUrl(undefined);
      setImageDescription("");
    }
  }, [open, stageData, clickedButton]);

  const saveImageToStore = () => {
    dispatch(
      updateStageData({
        stage: 6,
        data: {
          ...stageData,
          [clickedButton]: {
            img: imageUrl || null,
            description: imageDescription,
          },
        },
      })
    );
    console.log(stageData);
    setShowMessage(true);
  };

  useEffect(() => {
    if (
      imageUrl === stageData[clickedButton]?.img &&
      message &&
      stageData[clickedButton]?.img !== null
    ) {
      setMessage("Hooray! 😄 Image upload complete!");
    } else if (!imageUrl && !stageData[clickedButton]?.img) {
      setMessage("Image removed 🙂");
    } else {
      setShowMessage(false);
    }
  }, [imageUrl, isSameValue, stageData, clickedButton]);

  function disableSaveButton() {
    if (
      stageData[clickedButton].description !== imageDescription &&
      imageUrl &&
      imageUrl.length > 0
    ) {
      return false;
    }
    if (imageUrl === undefined || isSameValue) {
      return true;
    } else return false;
  }

  function disableTextfield() {
    if (stageData[clickedButton]?.img === null && !imageUrl) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {open && (
        <Transition.Root show={open} as={Fragment} key={clickedButton}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              setOpen(false);
              setShowMessage(false);
              setImageUrl("");
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                      <AnimatePresence>
                        {showMessage && (
                          <motion.div
                            className="relative"
                            initial={{ height: 0 }}
                            animate={{ height: "88px" }}
                            exit={{ height: 0 }}
                            transition={{
                              delay: isVisible ? 0.35 : 0,
                              duration: 0.35,
                            }}
                          >
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                delay: isVisible ? 0 : 0.35,
                                duration: 0.35,
                              }}
                            >
                              <FaTimes
                                onClick={() => {
                                  setOpen(false);
                                  setShowMessage(false);
                                }}
                                className="absolute right-0 h-6 w-6 cursor-pointer text-textBlack transition-colors hover:text-gray-700"
                              />
                              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                <CheckIcon
                                  className="h-6 w-6 text-green-600"
                                  aria-hidden="true"
                                />
                              </div>
                              <Dialog.Title
                                as="h3"
                                className="mt-3 text-center text-base font-semibold leading-6 text-gray-900 sm:mt-5"
                              >
                                {message}
                              </Dialog.Title>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {stageData[clickedButton]?.img !== null && (
                        <div className="mt-4 flex aspect-video w-full justify-center">
                          <img
                            className="h-full w-full object-cover "
                            src={
                              stageData[clickedButton].img &&
                              stageData[clickedButton].img
                            }
                            alt="If your image URL is valid, the image is shown here"
                          />
                        </div>
                      )}
                      <div className="mt-3 text-center sm:mt-5">
                        <CustomInput
                          onChange={(e) => setImageUrl(e.target.value.trim())}
                          required=""
                          labelName=""
                          colonSymbol=""
                          placeholder="Paste image URL here"
                          value={imageUrl}
                        />
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Boost your listing with vibrant images. Show your
                            venue's unique charm to attract more guests and
                            increase bookings.
                          </p>
                        </div>
                        <textarea
                          placeholder="What does your photo show?"
                          value={imageDescription}
                          disabled={disableTextfield()}
                          onChange={(e) => setImageDescription(e.target.value)}
                          className="mt-2 w-full rounded-md border px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondaryOrange sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="mt-5 flex justify-between gap-6 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-[#0091AE] px-3 py-2 text-sm  font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#34A9C0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0091AE]"
                        onClick={() => {
                          setOpen(false);
                          setShowMessage(false);
                        }}
                      >
                        Go back
                      </button>
                      <button
                        onClick={() => saveImageToStore()}
                        disabled={disableSaveButton()}
                        className={`inline-flex w-full justify-center rounded-md bg-[#88D8B0] px-3 py-2 text-sm  font-bold text-textBlack shadow-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#88D8B0] ${
                          disableSaveButton()
                            ? "opacity-30"
                            : "hover:bg-[#9bf6c9]"
                        }`}
                      >
                        Save
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};

export default AddImageModal;
