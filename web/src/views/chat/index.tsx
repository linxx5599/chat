import React, { useState, useEffect, useMemo } from "react";
import style from "./index.module.less";
import { useTranslation } from "react-i18next";
import { userApi } from "@/api";
import { userT } from "./types";

//socket.io
import socketIo, { socketConfig } from "@/utils/socket";

import { Input } from "antd";
// 左侧在头像、设置 SettingLeft
import SettingLeft from "./child/SettingLeft";
// 左侧用户列表 UserList
import UserList from "./child/UserList";
//聊天信息 ChatBox
import ChatBox from "./child/ChatBox";
//空图标 Empty
import Empty from "./child/Empty";

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const placeholder = t("search");

  const [userData, setUserData] = useState<userT[]>([]);

  const [userInfo, setUserInfo] = useState<userT | null>(null);

  const [socketMessages, setSocketMessages] = useState<{
    type: string;
    data: string;
  } | null>(null);

  const [checkUserInfo, setCheckUserInfo] = useState<userT | null>(null);

  const [emoticonsOpen, setEmoticonsOpen] = useState<boolean>(false);

  const [textAreaVal, setTextAreaVal] = useState("");

  const textAreaElFocus = (): void => {
    const textAreaEl: HTMLTextAreaElement | null = document.querySelector(
      ".chat-content-right-footer-edit"
    );
    textAreaEl && textAreaEl.focus();
  };

  const getUserInfo = () => {
    userApi.getUserInfo().then((result) => {
      setUserInfo(result.data);
      socketIo(result.data, { setSocketMessages });
    });
  };

  const getUser = () => {
    userApi.getUser().then((result) => {
      setUserData(result.data);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    if (!socketMessages) return;
    const { type, data } = socketMessages;
    if (data !== "success") return;
    const mapFn = {
      //用户通知更新列表
      [socketConfig.types.NOTICE_USER_ONLINE]() {
        getUser();
      }
    };
    mapFn[type]();
    console.log(socketMessages, "socketMessages");
  }, [socketMessages]);

  const bg = require("@/assets/images/bg.png").default;

  return (
    <>
      <div className={style["chat"]} style={{ backgroundImage: `url(${bg})` }}>
        <div className={style["chat-content"]}>
          <div className={style["chat-content-left"]}>
            {/* 左侧在头像、设置 */}
            <SettingLeft userInfo={userInfo} />

            <div className={style["chat-content-chat"]}>
              <div className={style["chat-content-chat-top"]}>
                <Input placeholder={placeholder} />
              </div>

              {/* 左侧用户列表 */}
              <UserList
                userData={userData}
                checkUserInfo={checkUserInfo}
                setCheckUserInfo={setCheckUserInfo}
                textAreaElFocus={textAreaElFocus}
              />
            </div>
          </div>
          <div className={style["chat-content-right"]}>
            {checkUserInfo ? (
              <ChatBox
                userInfo={userInfo}
                checkUserInfo={checkUserInfo}
                emoticonsOpen={emoticonsOpen}
                setEmoticonsOpen={setEmoticonsOpen}
                textAreaVal={textAreaVal}
                setTextAreaVal={setTextAreaVal}
                textAreaElFocus={textAreaElFocus}
              />
            ) : (
              <Empty />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
