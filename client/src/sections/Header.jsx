import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
          console.log(data);
        } else {
          console.log("You need to login to access!");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };
  const username = userInfo?.username;
  return (
    <div className="max-container ring mb-8 ">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold font-serif">
          Write It.
        </Link>
        <div className="flex gap-2">
          {username ? (
            <>
              <Link
                to="/create"
                className="bg-green-500 text-white py-1.5 px-4 rounded"
              >
                Create new post
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white py-1.5 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="bg-blue-500 border-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 border rounded"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600 font-semibold py-1.5 px-4 border rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
