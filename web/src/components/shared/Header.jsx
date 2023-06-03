import { useState, useEffect, useRef } from "react";
import { useLocation, NavLink, redirect } from "react-router-dom";
import AuthCarousel from "../../pages/HomePage/AuthCarousel";
import Menu from "../Menu";
import { getItem } from "../../utils/storage";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../store/modules/authenticationSlice";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const menuRef = useRef();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // This variable will be checked through Redux Store later

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuActive(false);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") {
        setIsAuthenticated(!!getItem("token"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      redirect("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="content-container flex items-center justify-between py-4 shadow">
      <div className="w-10 md:w-auto">
        <NavLink className="w-10 md:w-full" to="/">
          <img
            className="w-full md:hidden"
            src="/images/mobileIcon.svg"
            alt=""
          />
          <img className=" hidden md:block" src="/images/Group13.svg" alt="" />
        </NavLink>
      </div>
      {!isAuthenticated && isHomepage && <AuthCarousel />}
      <nav className="sm:relative" ref={menuRef}>
        <div
          onClick={() => setMenuActive(!menuActive)}
          className="flex h-4 cursor-pointer flex-col justify-between "
        >
          <div
            className={`h-1 w-8 bg-textBlack custom-transition${
              menuActive ? " translate-y-1.5 rotate-45" : ""
            }`}
          ></div>
          <div
            className={`h-1 w-8 bg-textBlack custom-transition${
              menuActive ? " -translate-y-1.5 -rotate-45" : ""
            }`}
          ></div>
        </div>
        {menuActive && <Menu setMenuActive={setMenuActive} />}
      </nav>
    </header>
  );
};

export default Header;
