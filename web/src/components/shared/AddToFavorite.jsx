import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FaPlusCircle } from "react-icons/fa";
import { StarIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import CreateCollectionModal from "../CreateCollectionModal";

function AddToFavorite({ open, setOpen, venueData, setIsFavorite }) {
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const id = venueData?.id;
  const image = venueData?.media?.[0]?.image || venueData?.coverPhoto;
  const title = venueData?.title;
  const [message, setMessage] = useState("");

  useEffect(() => {
    let loadedCollections =
      JSON.parse(localStorage.getItem("collections")) || [];
    setCollections(loadedCollections);
  }, [showModal]);

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const venue = {
      id: id,
      image: image,
      title: title,
    };

    if (selected === "Favorite") {
      const existingFavorites =
        JSON.parse(localStorage.getItem("Favorites")) || [];

      const doesVenueExist = existingFavorites.some(
        (favorite) => favorite.id === id
      );

      if (!doesVenueExist) {
        const updatedFavorites = [...existingFavorites, venue];
        localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
        setOpen(false);
        setIsFavorite(true);
      } else if (doesVenueExist) {
        setMessage("This venue is already in your favorites!");
      }
    } else if (selected === "New Collection") {
      setShowModal(true);
    } else {
      const existingCollections =
        JSON.parse(localStorage.getItem("collections")) || [];
      const selectedCollection = existingCollections.find(
        (collection) => collection.name === selected
      );

      if (selectedCollection) {
        const doesVenueExist = selectedCollection.venues.some(
          (venueItem) => venueItem.id === id
        );

        if (!doesVenueExist) {
          selectedCollection.venues.push(venue);
          localStorage.setItem(
            "collections",
            JSON.stringify(existingCollections)
          );
          setOpen(false);
          setIsFavorite(true);
        } else if (doesVenueExist) {
          setMessage("This venue is already in this collection!");
        }
      }
    }
  }

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                        <div className="px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-xl font-semibold leading-6 text-gray-900">
                              Add to Dream Stays
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                onClick={() => {
                                  setOpen(false);
                                  setSelected(null);
                                }}
                              >
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="relative mt-6 flex-1 px-4 sm:px-6">
                          <p className="mb-6">
                            Choose how you want to save the venue to your Dream
                            Stays
                          </p>
                          <button
                            type="button"
                            className={`relative mb-4 block aspect-video w-full max-w-[453px] rounded-lg 
                          border-2 border-dashed border-gray-300 p-12 text-center 
                          hover:border-gray-400  
                           focus:ring-offset-2 md:flex-1 ${
                             selected === "Favorite" &&
                             "outline-none ring-2 ring-secondaryOrange ring-offset-2"
                           }}`}
                            onClick={() => {
                              setSelected("Favorite");
                            }}
                          >
                            <StarIcon className="mx-auto h-12 w-12 text-secondaryOrange" />
                            <span className="mt-2 block text-sm font-semibold text-gray-900">
                              Add to Favorites without Collection
                            </span>
                          </button>
                          <button
                            type="button"
                            className={`relative
                          mb-4 block aspect-video w-full max-w-[453px] rounded-lg border-2 
                          border-dashed border-gray-300 p-12 text-center hover:border-gray-400 
                          md:flex-1 ${
                            selected === "New Collection" &&
                            "outline-none ring-2 ring-secondaryOrange ring-offset-2"
                          }`}
                            onClick={() => {
                              setSelected("New Collection");
                            }}
                          >
                            <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
                            <span className="mt-2 block text-sm font-semibold text-gray-900">
                              Create a new Collection
                            </span>
                          </button>
                          <div className="mb-2">
                            <p className="font-semibold ">Collections:</p>
                            <p className="text-sm text-red-600">{message}</p>
                          </div>
                          {!collections.length && (
                            <p>You have no collections at the moment</p>
                          )}
                          <ul className="flex flex-wrap gap-4">
                            {collections.map((collection, index) => (
                              <button
                                key={index}
                                className={`rounded-lg border-2 border-dashed border-gray-300 p-4 font-semibold 
                                hover:border-gray-400 ${
                                  selected === collection.name &&
                                  "outline-none ring-2 ring-secondaryOrange ring-offset-2"
                                }`}
                                onClick={() => {
                                  setSelected(collection.name);
                                }}
                              >
                                {collection.name}
                              </button>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                          onClick={() => {
                            setOpen(false);
                            setSelected(null);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={selected === null}
                          onClick={handleSubmit}
                          className={`
                        ml-4 inline-flex justify-center rounded-md  px-3 
                        py-2 text-sm font-semibold text-white shadow-sm 
                         focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2  
                        ${
                          selected === null
                            ? "cursor-not-allowed bg-gray-300"
                            : "bg-secondaryOrange hover:bg-[#EF6623] focus-visible:outline-[#EF6623]"
                        }`}
                        >
                          {selected === "New Collection" ? "Create" : "Add"}
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <CreateCollectionModal open={showModal} setOpen={setShowModal} />
    </>
  );
}

export default AddToFavorite;
