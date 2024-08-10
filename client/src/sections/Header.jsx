import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Dropdown from "../components/Dropdown";

import { MdMenu, MdMode, MdOutlineAccountCircle } from "react-icons/md";

const Header = () => {
  const { userInfo } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    };

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  // Assigning Username
  const username = userInfo?.username;

  return (
    <div className="max-container">
      <div className="h-16 w-full flex justify-between items-center px-6 ">
        <Link to={"/"} className="text-4xl font-montserrat font-black">
          Articul8
        </Link>
        <div className="flex items-center gap-3">
          {username ? (
            <>
              <div className=" hidden sm:flex gap-3">
                <Link to="/create" className=" flex items-center gap-2">
                  <button className="flex justify-center items-center size-12  rounded-xl shadow-custom transition ease-in-out delay-150 bg-red-500 hover:bg-red-600">
                    <MdMode className="size-6 bg-transparent text-white" />
                  </button>
                </Link>
                <div className="flex items-center">
                  <button
                    className="flex justify-center items-center size-12  rounded-xl shadow-custom transition ease-in-out delay-150 bg-gray-100 hover:bg-slate-200 "
                    onClick={() => setDropdown((prev) => !prev)}
                    ref={dropdownRef}
                  >
                    <MdOutlineAccountCircle className="size-7 bg-transparent" />
                  </button>
                </div>
              </div>
              <div className="sm:hidden flex items-center gap-2 ">
                <button
                  className="flex justify-center items-center size-12  transition ease-in-out delay-150 hover:scale-110"
                  onClick={() => setDropdown((prev) => !prev)}
                  ref={dropdownRef}
                >
                  <MdMenu className="size-11 bg-transparent" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="w-24 h-10 block" to={"/login"}>
                <button className="h-full w-full border border-gray-200 font-roboto font-medium text-sm transition ease-in-out delay-150 hover:border-gray-400">
                  Login
                </button>
              </Link>

              <Link className="w-24 h-10 block" to={"/register"}>
                <button className="h-full w-full  bg-black font-roboto font-medium text-sm text-gray-50 transition ease-in-out delay-150 hover:bg-slate-900">
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      {dropdown && <Dropdown />}
    </div>
  );
};

export default Header;
