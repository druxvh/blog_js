import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to={"/"} className="text-2xl font-bold font-serif">Write It.</Link>
      <div className="flex gap-2">
        <Link to={"/login"} className="bg-blue-500 border-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 px-4 border rounded">
          Login
        </Link>
        <Link to={"/register"} className="border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600 font-semibold py-1.5 px-4 border rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Nav;
