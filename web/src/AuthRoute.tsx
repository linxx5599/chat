import React from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

import router from "@/router";
import { getToken } from "@/utils/auth";
import { Watermark } from "antd";
import { disconnect } from "./utils/socket";

const AuthRoute: React.FC = () => {
  const ReactView = useRoutes(router);
  const hasToken = getToken();
  const location = useLocation();
  if (!hasToken) {
    disconnect();
    if (location.pathname !== "/login") return <Navigate to="/login" />;
  }
  return (
    <>
      <Watermark content="node.js + express + mysql + react18">
        {ReactView}
      </Watermark>
    </>
  );
};

export default AuthRoute;
