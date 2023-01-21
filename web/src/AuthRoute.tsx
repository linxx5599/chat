import React from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

import router from "@/router";
import { getToken } from "@/utils/auth";


const AuthRoute: React.FC = () => {
  const ReactView = useRoutes(router);
  const hasToken = getToken();
  const location = useLocation();
  if (!hasToken && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }
  return <>{ReactView}</>;
};

export default AuthRoute;
