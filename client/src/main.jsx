import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@material-tailwind/react";

//Pages, Components & Sections
import Layout from "./Pages/Layout.jsx";
import Content from "./sections/Content.jsx";
import Register from "./Pages/RegisterPage.jsx";
import Login from "./Pages/LoginPage.jsx";
import CreatePost from "./Pages/CreatePost.jsx";
import PostPage from "./Pages/PostPage.jsx";

import { UserContextProvider } from "./context/UserContext.jsx";
import EditPost from "./Pages/EditPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Content />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create",
        element: <CreatePost />,
      },
      {
        path: "/post/:id",
        element: <PostPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </UserContextProvider>
);
