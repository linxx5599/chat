import React, { useState } from "react";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider, theme } from "antd";
import AuthRoute from "./AuthRoute";
import SwitchSettingDrawer from "./SwitchThemeDrawer";

import { THEME_COLOR_NAME, LANG_NAME } from "@/utils/config";
import { testColor } from "@/utils";
import { i18nResArr } from "@/lang";
import { getLocal, setLocal } from "./utils/local";

const App: React.FC = () => {
  type localeType = "zh" | "en";
  const localeMap = {
    zh: zhCN,
    en: enUS
  };
  let lang = getLocal(LANG_NAME) as localeType;
  if (!lang || !i18nResArr.includes(lang)) {
    lang = "zh";
    setLocal(LANG_NAME, lang);
  }
  const [locale, setLocale] = useState(lang);
  const switchLang = (lan: localeType) => {
    setLocal(LANG_NAME, lan);
    setLocale(lan);
  };

  let themeColor = getLocal(THEME_COLOR_NAME) as string;
  if (!testColor(themeColor)) {
    themeColor = theme.useToken().token.colorPrimary;
    setLocal(THEME_COLOR_NAME, themeColor);
  }

  //"#00b96b"
  const [colorPrimary, setColorPrimary] = useState(themeColor);

  const switchThemeColor = (color: string = "#00b96b") => {
    setLocal(THEME_COLOR_NAME, color);
    setColorPrimary(color);
  };
  return (
    // <RouterProvider router={router} />
    <ConfigProvider
      locale={localeMap[lang]}
      theme={{
        token: {
          colorPrimary
        }
      }}
    >
      <AuthRoute />
      <SwitchSettingDrawer
        locale={locale}
        switchLang={switchLang}
        switchThemeColor={switchThemeColor}
      />
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
