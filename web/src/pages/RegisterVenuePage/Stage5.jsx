import StageTemplate from "./StageTemplate";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStageData } from "../../store/modules/displayedVenueStageSlice";
import { motion } from "framer-motion";

const Stage5 = () => {
  const minPrice = 100;
  const maxPrice = 110000;
  const step = 50;
  const stageData = useSelector((state) => state.displayedVenueStage.stageData);
  const dispatch = useDispatch();

  const initialValue = stageData?.stage5?.price ? stageData.stage5.price : 8500;
  const [price, setPrice] = useState(initialValue);

  const handleIncrement = () => {
    setPrice((prevPrice) => Math.min(prevPrice + step, maxPrice));
  };

  const handleDecrement = () => {
    setPrice((prevPrice) => Math.max(prevPrice - step, minPrice));
  };

  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setPrice(Math.max(Math.min(newValue, maxPrice), minPrice));
  };

  useEffect(() => {
    dispatch(updateStageData({ stage: 5, data: { price: price } }));
  }, [price]);

  const isDecrementDisabled = price <= minPrice;
  const isIncrementDisabled = price >= maxPrice;

  const [minusScale, setMinusScale] = useState(1);
  const [plusScale, setPlusScale] = useState(1);

  return (
    <div>
      <StageTemplate stageNumber={5} stageTitle={"Price"} />
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-2xl font-medium">Set price for your venue</p>
          <p>It's possible to change the price at anytime</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            disabled={isDecrementDisabled}
            onClick={handleDecrement}
            onMouseDown={() => setMinusScale(0.7)}
            onMouseUp={() => setMinusScale(1)}
            onMouseLeave={() => setMinusScale(1)}
            className={`flex-0 group grid h-10 w-10 place-items-center   rounded-full   border transition-all ${
              isDecrementDisabled
                ? "border-gray-300"
                : "cursor-pointer border-gray-500 hover:border-textBlack"
            }`}
          >
            <motion.div whileTap={{ scale: 0.7 }}>
              <FaMinus
                style={{ transform: `scale(${minusScale})` }}
                className={`  transition-all ${
                  isDecrementDisabled
                    ? "text-gray-300"
                    : "text-gray-500 group-hover:text-textBlack"
                }`}
              />
            </motion.div>
          </button>
          <input
            onChange={handleRangeChange}
            value={price}
            type="number"
            className="w-full flex-1 rounded-md border border-holidazeGrey px-2 py-2 text-center font-josefinsSans text-4xl font-medium"
          />
          <button
            disabled={isIncrementDisabled}
            onClick={handleIncrement}
            onMouseDown={() => setPlusScale(0.7)}
            onMouseUp={() => setPlusScale(1)}
            onMouseLeave={() => setPlusScale(1)}
            className={`flex-0 group grid h-10 w-10 place-items-center   rounded-full   border transition-all ${
              isIncrementDisabled
                ? "border-gray-300"
                : "cursor-pointer border-gray-500 hover:border-textBlack"
            }`}
          >
            <FaPlus
              style={{ transform: `scale(${plusScale})` }}
              className={`  transition-all ${
                isIncrementDisabled
                  ? "text-gray-300"
                  : "text-gray-500 group-hover:text-textBlack"
              }`}
            />
          </button>
        </div>
        <p className="text-center">per night</p>
        <input
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={handleRangeChange}
          className="cursor-pointer"
          type="range"
        />
        <div className="flex justify-between text-sm font-medium">
          <p>Min 100 kr</p>
          <p>Max 110 000 kr</p>
        </div>
      </div>
    </div>
  );
};

export default Stage5;
