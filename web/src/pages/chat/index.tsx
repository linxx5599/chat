import React from "react";
import "./index.less";
import { userApi } from "@/api";

const Chat: React.FC  = () => {
  const getUser = () => {
    userApi.getUser().then((result) => {
      console.log(result, "chst");
    });
  };
  getUser();
  return <div className="Chat">132</div>;
};

export default Chat;
