import React, { useState } from "react";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import cookie from "js-cookie";
import { ConfigProvider, Watermark, Button, theme } from "antd";
import AuthRoute from "./AuthRoute";
import SwitchThemeDrawer from "./SwitchThemeDrawer";

import { THEME_COLOR_NAME } from "@/utils/config";
import { testColor } from "@/utils";
const App: React.FC = () => {
  const [locale, setLocale] = useState(enUS);
  let themeColor = cookie.get(THEME_COLOR_NAME);
  if (!testColor(themeColor)) {
    themeColor = theme.useToken().token.colorPrimary;
    cookie.set(THEME_COLOR_NAME, themeColor);
  }
  //"#00b96b"
  const [colorPrimary, setColorPrimary] = useState(themeColor);

  const switchThemeColor = (color: string = "#00b96b") => {
    cookie.set(THEME_COLOR_NAME, color);
    setColorPrimary(color);
  };
  return (
    // <RouterProvider router={router} />
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary
        }
      }}
    >
      <Watermark content="node.js + express + mysql + react18">
        <AuthRoute />
        <SwitchThemeDrawer switchThemeColor={switchThemeColor} />
      </Watermark>
    </ConfigProvider>
    // <Routes>
    //   <Route path="/" element={<Navigate to={navigatePath} />} />
    //   <Route
    //     path="/login"
    //     element={
    //       <React.Suspense fallback={<>...</>}>
    //         <Login />
    //       </React.Suspense>
    //     }
    //   />
    //   <Route
    //     path="/chat"
    //     element={
    //       <AuthRoute>
    //         <React.Suspense fallback={<>...</>}>
    //           <Chat />
    //         </React.Suspense>
    //       </AuthRoute>
    //     }
    //   />
    //   <Route path="*" element={<NoMatch />} />
    // </Routes>
  );
};

export default App;
