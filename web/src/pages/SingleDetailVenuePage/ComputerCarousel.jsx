import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";

const ComputerCarousel = ({ venueData }) => {
  const validImages = venueData.media.filter((item) => item.image !== null);
  const firstFourImages = validImages.slice(0, 4);
  const remainingImages = validImages.length - 4;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden aspect-video h-full max-h-[512px] w-full gap-5 lg:flex    ">
        <div
          onClick={() => setOpen(true)}
          className=" h-full w-full flex-1 cursor-pointer  transition duration-200 hover:scale-[1.015]"
        >
          <img
            className="h-full w-full rounded-bl-2xl rounded-tl-[40px] object-cover"
            src={firstFourImages[0]?.image}
            alt=""
          />
        </div>
        <div className="flex h-full flex-1 flex-col gap-5">
          <div
            onClick={() => setOpen(true)}
            className="flex h-1/2 w-full flex-1 cursor-pointer transition duration-200 hover:scale-[1.015]"
          >
            <img
              className="w-full rounded-tr-2xl object-cover"
              src={firstFourImages[1]?.image}
              alt=""
            />
          </div>
          <div className="flex h-[calc(50%-20px)] flex-1 gap-5">
            <div
              onClick={() => setOpen(true)}
              className="h-full w-full cursor-pointer transition duration-200 hover:scale-[1.015]"
            >
              <img
                className="h-full w-full object-cover "
                src={firstFourImages[2]?.image}
                alt=""
              />
            </div>
            <div
              onClick={() => setOpen(true)}
              className="relative h-full w-full cursor-pointer transition duration-200 hover:scale-[1.015]"
            >
              <img
                className="h-full w-full rounded-br-[40px] object-cover"
                src={firstFourImages[3]?.image}
                alt=""
              />
              {remainingImages > 0 && (
                <div className="absolute inset-0 rounded-br-[40px] bg-black bg-opacity-50">
                  <div className="relative h-full w-full ">
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold text-white">
                      +
                      <span className="font-josefinsSans">
                        {remainingImages}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Lightbox
        slides={validImages.map((item) => ({
          src: item.image,
          alt: item.description,
          description: item.description,
        }))}
        open={open}
        close={() => setOpen(false)}
        plugins={[Captions, Fullscreen, Slideshow, Zoom]}
        captions={{
          showToggle: true,
        }}
      />
    </>
  );
};

export default ComputerCarousel;
