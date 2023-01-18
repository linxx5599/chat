import { getToken } from "@/utils/auth";
import { Navigate } from "react-router-dom";

import React from "react";

const AuthRoute = (props: any) => {
  const children = props.children;
  return getToken() ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
