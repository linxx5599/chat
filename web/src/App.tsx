import React from "react";
// 定义路由规则
import { Routes, Route, Navigate } from "react-router-dom";

// 路由匹配成功后要渲染的组件
import AuthRoute from "./AuthRoute";
import Login from "@/pages/login";
import Chat from "@/pages/chat";

const App = () => {
  const navigatePath = "/chat";
  return (
    <Routes>
      <Route path="/" element={<Navigate to={navigatePath} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/chat"
        element={
          <AuthRoute>
            <Chat />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
