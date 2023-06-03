import { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedView } from "../../store/modules/displayedHomepageViewSlice";
import { setCarouselIndex } from "../../store/modules/carouselIndexSlice";
import { motion, AnimatePresence } from "framer-motion";
import classNames from "classnames";

const AuthCarousel = () => {
  const dispatch = useDispatch();
  const [isDragTriggered, setIsDragTriggered] = useState(false);
  const views = useMemo(() => ["Login", "Booking", "Register"], []);
  const carouselIndex = useSelector(
    (state) => state.carouselIndex.currentIndex
  );
  const [currentIndex, setCurrentIndex] = useState(carouselIndex);

  const goPrev = useCallback(() => {
    setCurrentIndex((currentIndex - 1 + views.length) % views.length);
  }, [currentIndex, views]);

  const goNext = useCallback(() => {
    setCurrentIndex((currentIndex + 1) % views.length);
  }, [currentIndex, views]);

  useEffect(() => {
    if (!isDragTriggered) return;
    dispatch(setSelectedView(views[currentIndex]));
    setIsDragTriggered(false);
  }, [dispatch, currentIndex, isDragTriggered, views]);

  useEffect(() => {
    dispatch(setCarouselIndex(currentIndex));
  }, [currentIndex, dispatch]);

  useEffect(() => {
    setCurrentIndex(carouselIndex);
  }, [carouselIndex]);

  const handleClick = (view, index) => {
    setIsDragTriggered(false);
    dispatch(setSelectedView(view));
    dispatch(setCarouselIndex(index));
    console.log(currentIndex);

    if (index === 0) {
      goPrev();
    } else if (index === 2) {
      goNext();
    }
  };

  const swipeConfidenceThreshold = 1;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const orderedViews = [
    views[(currentIndex - 1 + views.length) % views.length],
    views[currentIndex],
    views[(currentIndex + 1) % views.length],
  ];

  const durations = [0.4, 0.6, 0.8];

  return (
    <AnimatePresence>
      <motion.div
        className="relative flex select-none items-center justify-center gap-5 px-2 md:gap-20 "
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.03}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            setIsDragTriggered(true);
            goNext();
          } else if (swipe > swipeConfidenceThreshold) {
            setIsDragTriggered(true);
            goPrev();
          }
        }}
      >
        <div className="gradient-opacity pointer-events-none absolute z-10 h-full w-full"></div>

        {orderedViews.map((view, index) => (
          <motion.div
            key={view}
            animate={{ y: 0, scale: index === 1 ? 1.3 : 1 }}
            transition={{
              y: { duration: durations[index] },
              scale: { type: "spring", stiffness: 400, damping: 50 },
            }}
            className={classNames(
              "cursor-pointer text-center text-xs sm:text-base md:text-lg",
              {
                "font-semibold": index === 1,
              }
            )}
            onClick={() => {
              handleClick(view, index);
            }}
          >
            {view}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthCarousel;
