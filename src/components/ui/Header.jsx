import { useState, useEffect, useRef } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
export const Header = () => {
  const [active, setActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

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
      <div className="wrapper w-[80%] mx-auto flex items-center justify-between">
        <div className="mobile-nav-container lg:justify-between md:justify-start flex gap-2 sm:gap-4 items-center">
          <div className="mobile-menu-icon lg:hidden" onClick={handleNavbar}>
            <RiMenu3Line className="text-[24px] menu-icon-svg lg:hidden lg:absolute" />
          </div>

          <div className="flex justify-between">
            <div className="">
              <NavLink
                to="/"
                className="site-title flex items-center text-[1.125rem] md:text-[24px] font-bold leading-normal poppins"
              >
                <img
                  className="w-[8rem] h-[2rem] md:w-[9.42544rem] md:h-[2.5625rem]"
                  src={logo}
                  alt="logo"
                />
              </NavLink>
            </div>
          </div>
        </div>

        <div className="login-button-container flex justify-between items-center">
          <div className={` flex items-center gap-10 justify-between`}>
            <ul className="hidden text-primary lg:flex gap-8 md:items-center leading-normal items-center text-[0.875rem]">
              <li className="poppins font-normal text-style under text-[1.125rem] leading-normal">
                <Link to="/">Home</Link>
              </li>
              <li className="roboto font-normal text-style under text-[1.125rem] leading-normal">
                <Link>About us</Link>
              </li>
            </ul>

            <div className="flex items-center gap-[6px] sm:gap-3">
              <Button onClick={() => navigate("login")}>Log In </Button>

              <ModeToggle />
            </div>
          </div>

          <div className=""></div>
        </div>

        <ul
          ref={menuRef}
          className={`mobile-menu ${
            active ? "w-[70%]" : "w-0"
          } h-screen overflow-hidden transition-all duration-300 ease-in-out z-10 absolute top-0 left-0 bg-[#f1eeee] lg:hidden`}
        >
          {active && (
            <RiCloseCircleFill
              onClick={handleNavbar}
              className="close mt-7 right-4 cursor-pointer font-medium text-[40px] leading-5 not-italic absolute"
            />
          )}
          <ul className="p-4 mt-20 w-[80%] ml-8">
            <li className="mb-5 text-[25px] font-medium leading-[120%] hover:underline">
              <NavLink
                to="/"
                onClick={() => {
                  setActive(false);
                }}
                className=""
              >
                Home
              </NavLink>
            </li>
            <li className="mb-5 text-[25px] font-medium leading-[120%] hover:underline">
              <NavLink
                to="/about-us"
                onClick={() => {
                  setActive(false);
                }}
                className=""
              >
                About
              </NavLink>
            </li>
            {/* Add other links here */}
          </ul>
          <div className="flex justify-end">
            <Button>click</Button>
          </div>
        </ul>
      </div>
    </section>
  );
};
