import React, { useState, useEffect } from "react";
import style from "./index.module.less";
import { useTranslation } from "react-i18next";
import { userApi } from "@/api";
import { userT } from "./types";

import { Input, Button } from "antd";
import Icon from "@/common/components/Icon";
// 左侧在头像、设置 SettingLeft
import SettingLeft from "./child/SettingLeft";
// 左侧用户列表 UserList
import UserList from "./child/UserList";
//聊天信息 ChatMsg
import ChatMsg from "./child/ChatMsg";
//空图标 Empty
import Empty from "./child/Empty";

const Chat: React.FC = () => {
  const { t } = useTranslation();
  const placeholder = t("search");

  const [userData, setUserData] = useState<userT[]>([]);

  const [userInfo, setUserInfo] = useState<userT | null>(null);

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
    });
  };

  const getUser = () => {
    userApi.getUser().then((result) => {
      setUserData(result.data);
    });
  };

  useEffect(() => {
    getUserInfo();
    getUser();
  }, []);

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
              <ChatMsg
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
