import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/login";
import Chat from "@/pages/chat";
const NoMatch = () => <>404</>;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/chat" />
  },
  {
    path: "/chat",
    id: "chat",
    element: <Chat />
  },
  {
    path: "/login",
    id: "login",
    element: <Login />
  },
  {
    path: "*",
    id: "NoMatch",
    element: <NoMatch />
  }
]);
export default router;
