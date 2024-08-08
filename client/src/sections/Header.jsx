import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Dropdown from "../components/Dropdown";

import { MdMode, MdOutlineAccountCircle } from "react-icons/md";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [dropdown, setDropdown] = useState(false)

  // const logout = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:4000/logout", {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     if (response.ok) setUserInfo(null);
  //     console.log("Logged Out");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              <Link to="/create" className=" flex items-center gap-2">
                  
                  <button className="flex justify-center items-center size-12  rounded-xl shadow-2xl shadow-black">

                  <MdMode className="size-6"/>
                  </button>
              </Link>
              <Link className="flex items-center gap-2 ">
                  
                  <button className="flex justify-center items-center size-12  rounded-xl shadow-2xl shadow-black " onClick={()=>setDropdown((prev)=> !prev)}>

                  <MdOutlineAccountCircle className="size-7"/>
                  </button>
              </Link>
              {/* <button
                onClick={logout}
                // className="bg-red-500 text-white py-1.5 px-4 rounded"
                className="w-24 h-10"
              >
                Logout
              </button> */}
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
      {dropdown && <Dropdown/>}
    </div>
  );
};

export default Header;
