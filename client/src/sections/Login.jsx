import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { userinfo, setUserInfo } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        response.json().then((userinfo) => {
          setUserInfo(userinfo);
          setRedirect(true);
        });
      } else {
        alert("Wrong credentials");
      }
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form className="max-w-sm mx-auto" onSubmit={loginUser}>
      <h1 className="text-3xl font-semibold font-serif my-8">Login</h1>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Your Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="@username"
          required
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Your Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Sign in
      </button>
    </form>
  );
};

export default Login;
