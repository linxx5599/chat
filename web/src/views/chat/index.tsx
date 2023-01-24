import React, { useState, useEffect } from "react";
import style from "./index.module.less";
import { Input, Image } from "antd";
import { userApi } from "@/api";
import Icon from "@/common/components/Icon";
import Emoticons from "./components/Emoticons";
import { useTranslation } from "react-i18next";
import { removeToken } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

interface userT {
  name: string;
  uuid: string;
}
const Chat: React.FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const placeholder = t("search");

  const [emoticonsOpen, setEmoticonsOpen] = useState(false);

  const emoticonsClick = () => {
    console.log(51);
  };

  const [userData, setUserData] = useState<userT[]>([]);

  const [userInfo, setUserInfo] = useState<userT | null>(null);

  const [checkUserInfo, setCheckUserInfo] = useState<userT | null>(null);

  const chatClick = ({ target }: any) => {
    if (![...target.classList].includes(style["chat-content-chat-list-item"])) {
      return;
    }
    const uuid = target.dataset.uuid;
    const info = userData.find((i) => i.uuid === uuid) || null;
    setCheckUserInfo(info);
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

  const user = require("@/assets/images/user.png").default;
  const bg = require("@/assets/images/bg.png").default;

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  const [textAreaVal, setTextAreaVal] = useState("");

  return (
    <>
      <div className={style["chat"]} style={{ backgroundImage: `url(${bg})` }}>
        <div className={style["chat-content"]}>
          <div className={style["chat-content-left"]}>
            <div className={style["chat-content-setting"]}>
              <div className={style["chat-content-setting-top"]}>
                <Image width={35} src={user} />
                <div className={style["chat-content-setting-userName"]}>
                  {userInfo && userInfo.name}
                </div>
              </div>
              <div
                className={style["chat-content-setting-bottom"]}
                onClick={logout}
              >
                <Icon name="logout" />
              </div>
            </div>
            <div className={style["chat-content-chat"]}>
              <div className={style["chat-content-chat-top"]}>
                <Input placeholder={placeholder} />
              </div>
              <div
                className={style["chat-content-chat-list"]}
                onClick={chatClick}
              >
                {userData.map((item) => {
                  return (
                    <div
                      className={`${style["chat-content-chat-list-item"]} ${
                        checkUserInfo && checkUserInfo.uuid === item.uuid
                          ? "check"
                          : ""
                      }`}
                      key={item.uuid}
                      data-uuid={item.uuid}
                    >
                      <div
                        className={style["chat-content-chat-list-item-left"]}
                      >
                        <img src={user} />
                      </div>
                      <div
                        className={style["chat-content-chat-list-item-right"]}
                      >
                        <div
                          className={
                            style["chat-content-chat-list-item-right-name"]
                          }
                        >
                          {item.name}
                        </div>
                        <div
                          className={
                            style["chat-content-chat-list-item-right-text"]
                          }
                        >
                          12321312
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={style["chat-content-right"]}>
            <div className={style["chat-content-right-top"]}>
              <div>{checkUserInfo && checkUserInfo.name}</div>
            </div>
            <div className={style["chat-content-right-content"]}></div>
            <div className={style["chat-content-right-footer"]}>
              <div className={style["chat-content-right-footer-top"]}>
                <Emoticons
                  textAreaVal={textAreaVal}
                  setTextAreaVal={setTextAreaVal}
                  open={emoticonsOpen}
                  setOpen={setEmoticonsOpen}
                >
                  <Icon onClick={emoticonsClick} name="smilingFace"></Icon>
                </Emoticons>
              </div>
              <Input.TextArea
                value={textAreaVal}
                onChange={(e) => setTextAreaVal(e.target.value)}
                className={
                  style["chat-content-right-footer-edit"] +
                  " chat-content-right-footer-edit"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
