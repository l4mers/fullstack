import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from 'embla-carousel-autoplay';
import "../../styles/emblaStyles.css";
import { NavLink, useNavigate } from "react-router-dom";

const SellingSection = ({ title, data }) => {
  // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const navigate = useNavigate();

  console.log("data: ", data);

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes()); // Access API
    }
  }, [emblaApi]);

  return (
    <div className="section-container my-6 w-full text-center md:mb-[80px] md:mt-[80px] md:text-start lg:mb-[120px] lg:mt-[120px]">
      <h2 className="mb-4 lg:mb-10">{title}</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {!data && <p>Loading....</p>}
          {data &&
            data.map((item, index) => (
              <NavLink key={index} to={item.id ? `/venue/${item.id}` : "#"}>
                <div className="sellingSectionCard embla__slide">
                  <img
                    loading="lazy"
                    className="aspect-square h-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </div>
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SellingSection;
