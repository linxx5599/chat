import React from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";

import router from "@/router";
import { getToken } from "@/utils/auth";

// const ToLogin = () => {
//   const navigate = useNavigate();
//   //周期完成后跳转登录界面
//   useEffect(() => navigate("/login"), []);
//   return <></>;
// };

const AuthRoute = () => {
  const ReactView = useRoutes(router);
  const hasToken = getToken();
  const location = useLocation();
  if (!hasToken && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }
  return <>{ReactView}</>;
};

export default AuthRoute;
