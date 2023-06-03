import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedView } from "../../store/modules/displayedHomepageViewSlice";
import { setCarouselIndex } from "../../store/modules/carouselIndexSlice";
import useAuth from "../../hooks/useAuth";

const Footer = () => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const loginView = () => {
    navigate("/");
    dispatch(setSelectedView("Login"));
    dispatch(setCarouselIndex(0));
  };

  return (
    <footer className="relative mt-[217px] h-[358px] text-white lg:mt-[297px] ">
      <aside className="aside-footer content-container relative z-10 w-[412.5px]  2xl:w-[468.5px]">
        <div className="content-container absolute left-0 flex h-[535px] w-full items-center justify-between">
          <div className="flex h-full flex-col justify-between py-10">
            <div className="flex">
              <img src="/images/footerIconDesktop.png" alt="" />
            </div>
            <div className="flex flex-col gap-4 text-2xl leading-7">
              <NavLink
                className="transition-colors duration-200 hover:text-secondaryOrange"
                to="https://www.facebook.com/emil.backi/"
              >
                FACEBOOK
              </NavLink>
              <NavLink
                className="transition-colors duration-200 hover:text-secondaryOrange"
                to="https://www.instagram.com/baackiii/"
              >
                INSTAGRAM
              </NavLink>
              <NavLink
                className="transition-colors duration-200 hover:text-secondaryOrange"
                to="https://twitter.com/backiz"
              >
                TWITTER
              </NavLink>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl ">Contact:</p>
              <NavLink to="mailto:emil_backi_@hotmail.com">
                emil_backi_@hotmail.com
              </NavLink>
              <NavLink to="mailto:gustav@henrikssons.org">
                gustav@henrikssons.org
              </NavLink>
            </div>
          </div>
          <div className="flex h-full w-auto flex-col justify-between pb-10 pt-14 text-right opacity-100 transition-opacity duration-1000 lg:w-0 lg:opacity-0 lg:duration-0">
            <div className="flex flex-col gap-4">
              <NavLink
                className={`${
                  !isAuthenticated
                    ? "cursor-not-allowed text-gray-500"
                    : "transition-colors duration-200 hover:text-secondaryOrange"
                }`}
                onClick={
                  !isAuthenticated
                    ? (e) => {
                        e.preventDefault();
                      }
                    : null
                }
                to="/profile"
              >
                Profile
              </NavLink>
              <NavLink
                className={`${
                  !isAuthenticated
                    ? "cursor-not-allowed text-gray-500"
                    : "transition-colors duration-200 hover:text-secondaryOrange"
                }`}
                onClick={
                  !isAuthenticated
                    ? (e) => {
                        e.preventDefault();
                      }
                    : null
                }
                to="/messages"
              >
                Inbox
              </NavLink>
              <NavLink
                className={`${
                  !isAuthenticated
                    ? "cursor-not-allowed text-gray-500"
                    : "transition-colors duration-200 hover:text-secondaryOrange"
                }`}
                onClick={
                  !isAuthenticated
                    ? (e) => {
                        e.preventDefault();
                      }
                    : null
                }
                to="/memories"
              >
                Memories
              </NavLink>
            </div>
            <div className="flex flex-col gap-4">
              <NavLink
                className="transition-colors duration-200 hover:text-secondaryOrange"
                to="/dreamstays"
              >
                Dream Stays
              </NavLink>
              <NavLink
                className={`${
                  !isAuthenticated
                    ? "cursor-not-allowed text-gray-500"
                    : "transition-colors duration-200 hover:text-secondaryOrange"
                }`}
                onClick={
                  !isAuthenticated
                    ? (e) => {
                        e.preventDefault();
                      }
                    : null
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <NavLink
                className={`${
                  !isAuthenticated
                    ? "cursor-not-allowed text-gray-500"
                    : "transition-colors duration-200 hover:text-secondaryOrange"
                }`}
                onClick={
                  !isAuthenticated
                    ? (e) => {
                        e.preventDefault();
                      }
                    : null
                }
                to="/registervenue"
              >
                Register Venue
              </NavLink>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-4">
              <NavLink
                className="transition-colors duration-200 hover:text-secondaryOrange"
                to="/"
              >
                {isAuthenticated ? "BOOKING" : "HOME"}
              </NavLink>
              <NavLink
                className="transition-colors duration-200 hover:text-secondaryOrange"
                to="/contact"
              >
                CONTACT
              </NavLink>
              <NavLink
                onClick={
                  isAuthenticated
                    ? () => {
                        logOut();
                      }
                    : () => {
                        loginView();
                      }
                }
                to="/"
                className="flex items-center gap-2 transition-colors duration-200 hover:text-secondaryOrange"
              >
                {isAuthenticated && <button>LOGOUT</button>}
                {!isAuthenticated && <button>LOGIN</button>}
                <span className="w-6 ">
                  {isAuthenticated && (
                    <img src="/images/logoutRed.svg" alt="logout" />
                  )}
                  {!isAuthenticated && (
                    <img src="/images/login.svg" alt="login" />
                  )}
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </aside>
      <div className="content-container absolute bottom-0 h-0 w-full bg-[#323232] transition-all duration-300 lg:h-full">
        <div className="hidden h-full w-full items-center justify-between pl-[412.5px] lg:flex 2xl:pl-[468.5px] ">
          <div className="flex flex-col gap-4">
            <NavLink
              className={`${
                !isAuthenticated
                  ? "cursor-not-allowed text-gray-500"
                  : "transition-colors duration-200 hover:text-secondaryOrange"
              }`}
              onClick={
                !isAuthenticated
                  ? (e) => {
                      e.preventDefault();
                    }
                  : null
              }
              to="/profile"
            >
              Profile
            </NavLink>
            <NavLink
              className={`${
                !isAuthenticated
                  ? "cursor-not-allowed text-gray-500"
                  : "transition-colors duration-200 hover:text-secondaryOrange"
              }`}
              onClick={
                !isAuthenticated
                  ? (e) => {
                      e.preventDefault();
                    }
                  : null
              }
              to="/messages"
            >
              Inbox
            </NavLink>
            <NavLink
              className={`${
                !isAuthenticated
                  ? "cursor-not-allowed text-gray-500"
                  : "transition-colors duration-200 hover:text-secondaryOrange"
              }`}
              onClick={
                !isAuthenticated
                  ? (e) => {
                      e.preventDefault();
                    }
                  : null
              }
              to="/memories"
            >
              Memories
            </NavLink>
          </div>
          <div className="flex flex-col gap-4">
            <NavLink
              className="transition-colors duration-200 hover:text-secondaryOrange"
              to="/dreamstays"
            >
              Dream Stays
            </NavLink>
            <NavLink
              className={`${
                !isAuthenticated
                  ? "cursor-not-allowed text-gray-500"
                  : "transition-colors duration-200 hover:text-secondaryOrange"
              }`}
              onClick={
                !isAuthenticated
                  ? (e) => {
                      e.preventDefault();
                    }
                  : null
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={`${
                !isAuthenticated
                  ? "cursor-not-allowed text-gray-500"
                  : "transition-colors duration-200 hover:text-secondaryOrange"
              }`}
              onClick={
                !isAuthenticated
                  ? (e) => {
                      e.preventDefault();
                    }
                  : null
              }
              to="/registervenue"
            >
              Register Venue
            </NavLink>
          </div>
          <div className="z-10 flex flex-col gap-4">
            <NavLink
              className="transition-colors duration-200 hover:text-secondaryOrange"
              to="/"
            >
              {isAuthenticated ? "BOOKING" : "HOME"}
            </NavLink>
            <NavLink
              className="transition-colors duration-200 hover:text-secondaryOrange"
              to="/contact"
            >
              CONTACT
            </NavLink>
            <NavLink
              onClick={
                isAuthenticated
                  ? () => {
                      logOut();
                    }
                  : () => {
                      loginView();
                    }
              }
              to="/"
              className="flex items-center gap-2 transition-colors duration-200 hover:text-secondaryOrange"
            >
              {isAuthenticated && <button>LOGOUT</button>}
              {!isAuthenticated && <button>LOGIN</button>}
              <span className="w-6 ">
                {isAuthenticated && (
                  <img src="/images/logoutRed.svg" alt="logout" />
                )}
                {!isAuthenticated && (
                  <img src="/images/login.svg" alt="login" />
                )}
              </span>
            </NavLink>
          </div>
          <img src="/images/footerIllustration.svg" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
