import React from "react";
import style from "./index.module.less";
import { userT } from "../../types";
import Icon from "@/common/components/Icon";
interface IProps {
  userData: userT[];
  checkUserInfo: userT | null;
  setCheckUserInfo: React.Dispatch<React.SetStateAction<userT | null>>;
  textAreaElFocus: () => void;
}

const UserList: React.FC<IProps> = ({
  userData,
  checkUserInfo,
  setCheckUserInfo,
  textAreaElFocus
}) => {
  const user = require("@/assets/images/user.png").default;

  const chatClick = ({ target }: any) => {
    if (![...target.classList].includes("chat-content-chat-list-item")) {
      return;
    }
    const uuid = target.dataset.uuid;
    const info = userData.find((i) => i.uuid === uuid) || null;
    setCheckUserInfo(info);

    //聚焦输入框
    textAreaElFocus();
  };
  return (
    <>
      <div className={style["chat-content-chat-list"]} onClick={chatClick}>
        {userData.map((item) => {
          return (
            <div
              className={`${style["chat-content-chat-list-item"]} ${
                checkUserInfo && checkUserInfo.uuid === item.uuid ? "check" : ""
              } chat-content-chat-list-item`}
              key={item.uuid}
              data-uuid={item.uuid}
            >
              <div className={style["chat-content-chat-list-item-left"]}>
                <img src={user} />
              </div>
              <div className={style["chat-content-chat-list-item-right"]}>
                <div
                  className={style["chat-content-chat-list-item-right-name"]}
                >
                  {item.name}
                  {item.online ? <Icon name="online" />: <></>}
                </div>
                <div
                  className={style["chat-content-chat-list-item-right-text"]}
                >
                  12321312
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UserList;
