import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleImage } from "../../store/modules/headerImageSlice";
import {
  SET_SINGLE_IMAGE_DESKTOP,
  SET_SINGLE_IMAGE_MOBILE,
} from "../../store/modules/headerImageSlice";
import Login from "./Login";
import Register from "./Register";
import Booking from "./Booking";

const Main = () => {
  const dispatch = useDispatch();
  const { imageDesktop, imageMobile } = useSelector(
    (state) => state.headerImage
  );
  const { selectedView } = useSelector((state) => state.displayedHomepageView);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterSuccess = (registeredEmail, registeredPassword) => {
    return new Promise((resolve) => {
      setEmail(registeredEmail);
      setPassword(registeredPassword);
      resolve();
    });
  };

  const toggleView = useMemo(() => {
    switch (selectedView) {
      case "Booking":
        return <Booking />;
      case "Register":
        return <Register onRegisterSuccess={handleRegisterSuccess} />;
      case "Login":
        return <Login email={email} password={password} />;
      default:
        console.error("Something went wrong");
    }
  }, [selectedView, email, password]);

  const storedMobileImage = localStorage.getItem("mobileImage");
  const storedDesktopImage = localStorage.getItem("desktopImage");

  const checkWindowSize = () => {
    console.log("checkWindowSize, rendered");
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const debouncedCheckWindowSize = debounce(checkWindowSize, 200);

  useEffect(() => {
    window.addEventListener("resize", debouncedCheckWindowSize);

    return () => {
      window.removeEventListener("resize", debouncedCheckWindowSize);
    };
  }, []);

  const fetchImageIfNeeded = (orientation) => {
    return new Promise(async (resolve) => {
      const storedImage =
        orientation === "portrait" ? storedMobileImage : storedDesktopImage;
      const currentTime = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

      if (storedImage) {
        const { image, altText, timestamp } = JSON.parse(storedImage);

        if (currentTime - timestamp < maxAge) {
          if (orientation === "portrait") {
            dispatch(
              SET_SINGLE_IMAGE_MOBILE({
                urls: { full: image },
                alt_description: altText,
              })
            );
          } else {
            dispatch(
              SET_SINGLE_IMAGE_DESKTOP({
                urls: { full: image },
                alt_description: altText,
              })
            );
          }
          resolve();
          return;
        }
      }

      await dispatch(fetchSingleImage(orientation));
      resolve();
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const updateImage = async () => {
      if (windowWidth > 768 && !imageDesktop) {
        await fetchImageIfNeeded("landscape");
      } else if (windowWidth <= 768 && !imageMobile) {
        await fetchImageIfNeeded("portrait");
      }
      setIsLoading(false);
    };
    updateImage();
  }, [windowWidth, dispatch, imageDesktop, imageMobile]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="relative h-0 min-h-[600px] ">
          <div className="absolute inset-0 max-h-[760px]">
            {windowWidth > 768 && imageDesktop ? (
              <img
                className="h-full max-h-[760px] w-full object-cover"
                src={imageDesktop.urls.full}
                alt={imageDesktop.alt_description}
              />
            ) : (
              imageMobile && (
                <img
                  className="h-full w-full object-cover "
                  src={imageMobile.urls.full}
                  alt={imageMobile.alt_description}
                />
              )
            )}
            {toggleView}
          </div>
        </div>
      )}
    </>
  );
};

function debounce(func, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default Main;
