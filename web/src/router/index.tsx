import React, { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import Loading from "@/common/components/loading";
const NoMatch: () => JSX.Element = () => <>404</>;

const LayLoadingFn = (Element: () => Promise<any>) => {
  const View = lazy(Element);
  return (
    <React.Suspense fallback={<Loading />}>
      <View />
    </React.Suspense>
  );
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/chat" />
  },
  {
    path: "/chat",
    id: "chat",
    element: LayLoadingFn(() => import("@/views/chat"))
  },
  {
    path: "/login",
    id: "login",
    element: LayLoadingFn(() => import("@/views/login"))
  },
  {
    path: "*",
    id: "NoMatch",
    element: <NoMatch />
  }
];

export default routes;
