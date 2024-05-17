import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import icons from "@/icons";
icons();
// 定义当前项目的路由模式
import App from "./App";
import "@/style/index.less";
//国际化
import langJs from "@/lang";
langJs();
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
