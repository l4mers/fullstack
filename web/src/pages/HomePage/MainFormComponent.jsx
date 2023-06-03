import { motion, AnimatePresence } from "framer-motion";

const MainFormComponent = ({ children, onSubmit }) => {
  const fadeInOutVariants = {
    in: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: "easeInOut",
      },
    },
    out: {
      y: 10,
      opacity: 0.7,
      transition: {
        duration: 0.35,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="section-container absolute left-0 top-0 z-10 h-full w-full md:left-1/2 md:w-11/12 md:-translate-x-1/2 ">
      <div className="relative h-full w-full ">
        <form
          onSubmit={onSubmit}
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 "
        >
          <AnimatePresence>
            <motion.div
              key={children}
              initial="out"
              animate="in"
              exit="out"
              variants={fadeInOutVariants}
            >
              <div className="bg-black bg-opacity-40 text-white md:w-full md:bg-opacity-30">
                <div className="md:0 mx-auto max-w-4xl px-2 py-2 sm:px-4 md:py-10">
                  <h1 className="mb-2 text-2xl font-semibold md:text-4xl">
                    Find Your Perfect Stay!
                  </h1>
                  <p className="text-sm md:text-base">
                    At Holidaze, you can find thousands of cottages, houses, and
                    apartments that you can rent directly from the owners -
                    without any hassle. Renting is easy: simply locate a
                    property using our search function, and then contact the
                    owner directly for inquiries and booking.
                  </p>
                </div>
              </div>

              {children}
            </motion.div>
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default MainFormComponent;
