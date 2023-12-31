import { useState, useEffect, useRef } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "../../Auth/AuthContext";
// import { ProfileButton } from "./ProfileButton";
import { ProfileButton } from "./ProfileButton";
export const Header = () => {
  const [active, setActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // sidebar toggle function
  const handleNavbar = () => {
    setActive(!active);
  };

  // useEffect function to handle outside click to toggle
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActive(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  // active page indicator
  const navLinkStyle = ({ isActive }) => {
    return {
      textDecoration: isActive ? "underline" : "none",
      textDecorationColor: isActive ? "#31af31" : "none",
      textDecorationThickness: isActive ? "2px" : "0px",
      textUnderlineOffset: isActive ? "0.3em" : "none",
      color: isActive ? "#31af31" : "",
    };
  };

  return (
    <section
      className={`header fixed px-2 bg-white dark:bg-[#020617] border-b-[1px] sm:px-4 py-2 md:py-2.5 z-20 top-0 left-0 shadow-md w-full flex items-center justify-between ${
        active ? "blur-active" : ""
      }`}
    >
      <div className="wrapper w-[95%] md:w-[80%] mx-auto flex items-center justify-between">
        <div className="mobile-nav-container gap-2 flex items-center">
          <div className="mobile-menu-icon lg:hidden" onClick={handleNavbar}>
            <RiMenu3Line className="text-[24px] menu-icon-svg lg:hidden lg:absolute" />
          </div>

          <div className="">
            <div className="">
              <Link to="/" className="site-title flex items-center">
                <img className="md:w-10 md:h-10" src={logo} alt="logo" />
                {/* <span> ME </span> */}
              </Link>
            </div>
          </div>
        </div>

        <div className="login-button-container flex justify-between items-center">
          <div className={` flex items-center gap-10 justify-between`}>
            <ul className="hidden text-black dark:text-white lg:flex gap-8 md:items-center leading-normal items-center text-[0.875rem]">
              <li className="font-normal text-style under text-[1.125rem] leading-normal">
                <Link to="/">Home</Link>
              </li>
              <li className="font-normal text-style under text-[1.125rem] leading-normal">
                <Link>About us</Link>
              </li>
            </ul>

            <div className="flex items-center gap-[6px] sm:gap-3">
              {currentUser ? (
                <div>
                  <ProfileButton />
                </div>
              ) : (
                <Button onClick={() => navigate("login")}>Log In </Button>
              )}

              <ModeToggle />
            </div>
          </div>

          <div className=""></div>
        </div>

        <ul
          ref={menuRef}
          className={`mobile-menu ${
            active ? "w-[85%]" : "w-0"
          } h-screen overflow-hidden transition-all duration-300 ease-in-out z-10 absolute top-0 left-0 bg-white dark:bg-[#020617] lg:hidden`}
        >
          {active && (
            <RiCloseCircleFill
              onClick={handleNavbar}
              className="close mt-7  right-4 cursor-pointer font-medium text-[40px] leading-5 not-italic absolute"
            />
          )}
          <ul className="p-4 mt-20 w-[80%] ml-8">
            <li className="mb-5 text-[25px] font-medium leading-[120%] hover:underline">
              <Link
                to="/"
                onClick={() => {
                  setActive(false);
                }}
                className=""
              >
                Home
              </Link>
            </li>
            <li className="mb-5 text-[25px] font-medium leading-[120%] hover:underline">
              <Link
                to="/about-us"
                onClick={() => {
                  setActive(false);
                }}
                className=""
              >
                About
              </Link>
            </li>
            {/* Add other links here */}
          </ul>
        </ul>
      </div>
    </section>
  );
};
