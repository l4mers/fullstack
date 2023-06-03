import { motion, useAnimation } from "framer-motion";
import amenityImages from "../../utils/amenityImages";

const AmenityButton = ({ amenity, index, isActive, handleAmenityClick }) => {
  const controls = useAnimation();

  const handleAnimation = (action) => {
    if (action === "start") {
      controls.start({ scale: 0.9 });
    } else if (action === "end") {
      controls.start({ scale: 1 });
    }
  };

  return (
    <button
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border bg-white p-4 transition duration-300 ${
        isActive ? "border-secondaryOrange ring-2 ring-secondaryOrange" : ""
      } hover:border-secondaryOrange hover:ring-2 hover:ring-secondaryOrange`}
      key={index}
      onMouseDown={() => {
        handleAmenityClick(amenity);
        handleAnimation("start");
      }}
      onMouseUp={() => {
        handleAnimation("end");
      }}
      onMouseLeave={() => {
        handleAnimation("end");
      }}
    >
      <motion.img
        className="w-7"
        src={amenityImages[amenity.amenity]}
        alt={amenity.amenity}
        animate={controls}
        transition={{ type: "spring", stiffness: 500 }}
      />
      <p className="text-lg font-semibold">{amenity.amenity}</p>
    </button>
  );
};

export default AmenityButton;
