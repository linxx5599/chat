import React from "react";
import { createRoot } from "react-dom/client";
// 定义当前项目的路由模式
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
