import { FaPlusCircle, FaHandPointRight, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import CreateCollectionModal from "../../components/CreateCollectionModal";

const DreamStaysPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [collections, setCollections] = useState([]);
  const [showCreateCollectionModal, setCreateCollectionModal] = useState(false);

  useEffect(() => {
    const localFavorites = localStorage.getItem("Favorites");
    const localCollections = localStorage.getItem("collections");

    if (localFavorites) {
      setFavorites(JSON.parse(localFavorites));
    }

    if (localCollections) {
      setCollections(JSON.parse(localCollections));
    }
  }, [showCreateCollectionModal]);

  console.log("favorites: ", favorites);
  console.log("collections: ", collections);

  return (
    <main className="section-container">
      <CreateCollectionModal
        open={showCreateCollectionModal}
        setOpen={setCreateCollectionModal}
      />
      <h2 className="mt-4 md:mt-10">Dream Collection</h2>
      <div className="grid grid-cols-1 gap-2 profileSmallScreen:grid-cols-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => setCreateCollectionModal(true)}
          className={`relative block w-full max-w-[453px] rounded-lg border-2 border-dashed border-gray-300  text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1 ${
            collections.length ? "p-8" : "aspect-video p-12"
          }`}
        >
          <FaPlusCircle className="mx-auto h-12 w-12 text-secondaryOrange" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Create a new Collection
          </span>
        </button>
        {!collections.length && (
          <p className="max-w-[453px] md:flex-1">
            Organize your Dream Stays with Dream Collections. Group
            accommodations by destination, trip theme, or any category you
            desire. Make planning your next getaway a breeze with these neatly
            arranged collection of your favourite stays.
          </p>
        )}
        {collections &&
          collections.map((collection, index) => (
            <button
              key={index}
              type="button"
              className=" relative block w-full max-w-[453px] rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-secondaryOrange focus:ring-offset-2 md:flex-1"
            >
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                {collection.name}
              </span>
              <FaTrashAlt className="absolute right-4 top-4 h-6 w-6 text-primaryRed transition hover:scale-105 hover:text-red-500" />
            </button>
          ))}
      </div>
      <div className="flex max-w-[453px] flex-col items-center gap-10 md:max-w-[925px] md:flex-row md:items-end md:justify-between">
        <div className="max-w-[453px] md:flex-1">
          <h2 className="mt-4 md:mt-10">Dream Stays</h2>
          <p>
            Save your favorite places to Dream Stays, and access them anytime
            you wish. Browse, compare, and plan your ideal vacation with our
            handpicked selections.
          </p>
          <button className="secondaryBtn group mt-4 flex items-center justify-center gap-2 uppercase transition-all duration-300 hover:bg-primaryRed hover:text-background">
            <span>Find Accommodation's</span>
            <span>
              <FaHandPointRight className="w-0 animate-bounce-right opacity-0 transition-all duration-300 group-hover:h-6 group-hover:w-6 group-hover:opacity-100" />
            </span>
          </button>
        </div>
        <img
          className="max-w-[125px] md:max-w-none "
          src="/images/favoritePageIllustration.svg"
          alt=""
        />
      </div>
    </main>
  );
};

export default DreamStaysPage;
