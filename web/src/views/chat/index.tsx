import React, { useState, useEffect } from "react";
import style from "./index.module.less";
import { Input } from "antd";
import { userApi } from "@/api";
import Icon from "@/common/components/Icon";
import ImageModal from "./components/ImageModal";
import { useTranslation } from "react-i18next";

interface userT {
  name: string;
  uuid: string;
}
const Chat: React.FC = () => {
  const { t } = useTranslation();
  const placeholder = t("search");

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

  //ImageModal
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={style["chat"]} style={{ backgroundImage: `url(${bg})` }}>
        <div className={style["chat-content"]}>
          <div className={style["chat-content-left"]}>
            <div className={style["chat-content-setting"]}>
              <div className={style["chat-content-setting-top"]}>
                <img src={user} onClick={() => setOpen(true)} />
                <div className={style["chat-content-setting-userName"]}>
                  {userInfo && userInfo.name}
                </div>
              </div>
              <div className={style["chat-content-setting-bottom"]}>
                <Icon name="logout" />
              </div>
            </div>
            <div className={style["chat-content-chat"]}>
              <div className={style["chat-content-chat-top"]}>
                <Input placeholder={placeholder}></Input>
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
          </div>
        </div>
      </div>
      {open && <ImageModal open={open} setOpen={setOpen} src={user} />}
    </>
  );
};

export default Chat;
