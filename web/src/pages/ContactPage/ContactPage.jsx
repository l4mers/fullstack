import { FaGithubSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ContactPage = () => {
  return (
    <main className="mx-auto w-full smallScreen:w-11/12 smallScreen:max-w-[1440px]">
      <h1 className=" mb-6 mt-4 text-center text-2xl smallScreen:text-left">
        Website creator's
      </h1>
      <div className="mb-10 max-w-sm md:flex md:max-w-none md:flex-row-reverse md:place-content-start md:gap-10">
        <div className="relative flex items-center justify-between px-4 smallScreen:px-0 md:w-full md:max-w-xl md:items-start">
          <h2>Gustav Henriksson</h2>
          <p className="text-xs font-semibold">Backend Guru</p>
          <div className="absolute bottom-0 right-0 hidden gap-4 md:flex">
            <NavLink to="https://github.com/l4mers">
              <FaGithubSquare className="h-8 w-8 cursor-pointer text-primaryRed transition hover:text-secondaryOrange" />
            </NavLink>
            <NavLink to="https://www.linkedin.com/in/gustav-henriksson-javadev/">
              <FaLinkedin className="h-8 w-8 cursor-pointer text-primaryRed transition hover:text-secondaryOrange" />
            </NavLink>
          </div>
        </div>
        <div className="aspect-square min-w-[210px] flex-1 overflow-hidden md:max-w-[260px] md:rounded">
          <img
            className="h-full w-full object-cover"
            src="/images/contact/gustav.webp"
            alt="profile picture of Gustav Henriksson"
          />
        </div>
      </div>
      <div className="max-w-sm md:flex md:max-w-none md:flex-row-reverse md:place-content-start md:gap-10">
        <div className="relative flex items-center justify-between px-4 smallScreen:px-0 md:w-full md:max-w-xl md:items-start">
          <h2>Emil Backlund</h2>
          <p className="text-xs font-semibold">Frontend Guru</p>
          <div className="absolute bottom-0 right-0 hidden gap-4 md:flex">
            <NavLink to="https://github.com/EmilBacklund">
              <FaGithubSquare className="h-8 w-8 cursor-pointer text-primaryRed transition hover:text-secondaryOrange" />
            </NavLink>
            <NavLink to="https://twitter.com/backiz">
              <FaTwitterSquare className="h-8 w-8 cursor-pointer text-primaryRed transition hover:text-secondaryOrange" />
            </NavLink>
            <NavLink to="https://www.linkedin.com/in/emil-backlund-55b10021a/">
              <FaLinkedin className="h-8 w-8 cursor-pointer text-primaryRed transition hover:text-secondaryOrange" />
            </NavLink>
          </div>
        </div>
        <div className="aspect-square min-w-[210px] flex-1 overflow-hidden md:max-w-[260px] md:rounded">
          <img
            className="h-full w-full object-cover"
            src="/images/contact/emil.png"
            alt="profile picture of Emil Backlund"
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
