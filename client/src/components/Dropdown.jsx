import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const menuItems = [
  {
    title: "My Posts",
    url: "/",
  },
  {
    title: "Saved",
    url: "/",
  },
  {
    title: "Likes",
    url: "/",
  },
];

const liStyle = `px-2 py-3
             transition ease-in-out delay-150 hover:bg-slate-200`;
       
             

const Dropdown = () => {
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

      const username = userInfo?.username;

  return (
    <div className="max-container relative">
      <ul className="w-[200px] h-[240px] absolute right-0 flex flex-col justify-evenly bg-slate-50 rounded-lg font-montserrat font-semibold drop-shadow-lg">
        <span className="p-2 text-center cursor-pointer">@drux</span>

        {menuItems.map(({ title, url, index }) => {
          return (
            <Link to={url} key={index}>
              <li className={`${liStyle}`}>{title}</li>
            </Link>
          );
        })}

        <button onClick={logout}>
          <li
            className="flex justify-center items-center mx-1 py-3 border-0 rounded-lg bg-red-200 hover:bg-red-300 hover:text-slate-900
             transition ease-in-out delay-150 "
          >
            Logout
          </li>
        </button>
      </ul>
    </div>
  );
};

export default Dropdown;
