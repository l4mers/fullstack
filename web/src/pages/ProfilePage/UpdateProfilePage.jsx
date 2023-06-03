import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CustomInput from "../../components/FormComponents/CustomInput";
import editProfileApi from "../../api/editProfileApi";
import { useState } from "react";
import { setUserAvatar } from "../../store/modules/userMenuInfoSlice";
import { useDispatch } from "react-redux";
import { setNotification } from "../../store/modules/notificationSlice";

function UpdateProfilePage({ open, setOpen }) {
  const [info, setInfo] = useState({
    avatar: "",
    background: "",
    bio: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await editProfileApi(info);
      console.log("info: ", info);
      console.log("response: ", response);

      if (response) {
        console.log("Profile updated successfully");
        dispatch(setUserAvatar(info.avatar));
        setOpen(false);
        dispatch(
          setNotification({
            message: "Profile updated successfully!",
            details: "Your changes have been saved.",
            isSuccessful: true,
            show: true,
          })
        );
      } else {
        console.log("Profile update failed");
        setOpen(false);
        dispatch(
          setNotification({
            message: "Profile update failed!",
            details: "Please try again later.",
            isSuccessful: false,
            show: true,
          })
        );
      }
    } catch (error) {
      console.log("error: ", error);
      setOpen(false);
      dispatch(
        setNotification({
          message: "Profile update failed!",
          details: "Please try again later.",
          isSuccessful: false,
          show: true,
        })
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className=" relative z-20"
          onClose={() => setOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" />
          <div className="fixed inset-0  ">
            <div className="fixed inset-0 overflow-hidden ">
              <div className="absolute inset-0 overflow-hidden ">
                <div className="pointer-events-none fixed inset-y-0 left-0 right-0 max-w-full ">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto mx-auto  h-full w-screen max-w-[1440px] md:w-11/12 md:px-0">
                      <div className=" space-y-10 divide-y divide-gray-900/10 ">
                        <div className="grid h-screen grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                          <div className="max-h-full px-4 md:mt-4 md:px-0">
                            <h3 className="text-base font-semibold leading-7 text-white md:text-2xl ">
                              Profile
                            </h3>
                            <p className="mt-1 text-sm leading-6 text-white">
                              This information will be displayed publicly so be
                              careful what you share.
                            </p>
                          </div>
                          <form className="flex h-[calc(100vh-112px)] flex-col  justify-between bg-background shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 md:h-screen">
                            <div className="flex min-h-0 flex-col  px-4 py-6 sm:p-8">
                              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 overflow-y-auto sm:grid-cols-6">
                                <div className="col-span-full">
                                  <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Photo
                                  </label>
                                  <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon
                                      className="h-12 w-12 text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <CustomInput
                                      flex1="flex-1"
                                      name="avatar"
                                      onChange={handleChange}
                                      required=""
                                      colonSymbol=""
                                      marginTop="mt-0"
                                      placeholder="Paste a URL to an image to set it as your profile photo."
                                    />
                                  </div>
                                </div>
                                <div className="col-span-full">
                                  <label
                                    htmlFor="background"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Cover photo
                                  </label>
                                  <CustomInput
                                    name="background"
                                    onChange={handleChange}
                                    flex1="flex-1"
                                    required=""
                                    colonSymbol=""
                                    marginTop="mt-0"
                                    placeholder="Paste a URL to an image to set it as your cover photo."
                                  />
                                  <div className="relative mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="absolute top-0 h-full w-full">
                                      <img
                                        className="h-full w-full"
                                        src=""
                                        alt="Cover photo preview"
                                      />
                                    </div>
                                    <div className="text-center">
                                      <PhotoIcon
                                        className="mx-auto h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-full">
                                  <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    About
                                  </label>
                                  <div className="mt-2">
                                    <textarea
                                      id="bio"
                                      name="bio"
                                      onChange={handleChange}
                                      rows={5}
                                      className="block w-full rounded-md border-0 py-1.5 indent-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondaryOrange sm:text-sm sm:leading-6"
                                      defaultValue={""}
                                    />
                                  </div>
                                  <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Write a few sentences about yourself.
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-shrink-0 items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="text-sm font-semibold leading-6 text-gray-900"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                onClick={handleSubmit}
                                className="rounded-md bg-secondaryOrange px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#EF6623] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondaryOrange"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

export default UpdateProfilePage;
