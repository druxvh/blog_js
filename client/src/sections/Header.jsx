import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  

  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:4000/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) setUserInfo(null);
      console.log("Logged Out");
    } catch (error) {
      console.error(error);
    }
  };

  // Assigning Username
  const username = userInfo?.username;
  return (
    <div className="max-container mb-8 ">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold font-serif">
          Blog
        </Link>
        <div className="flex gap-2">
          {username ? (
            <>
            <h1 className="p-1">{username}</h1>
              <Link
                to="/create"
                className="bg-green-500 text-white py-1.5 px-4 rounded"
              >
                Create Post
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
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
