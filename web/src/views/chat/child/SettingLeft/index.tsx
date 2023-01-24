import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./index.module.less";

import { removeToken } from "@/utils/auth";

import Icon from "@/common/components/Icon";
import { Image } from "antd";
import { userT } from "../../types";
interface IProps {
  userInfo: userT | null;
}

const SettingLeft: React.FC<IProps> = ({ userInfo }) => {
  const navigate = useNavigate();

  const user = require("@/assets/images/user.png").default;

  const logout = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <>
      <div className={style["chat-content-setting"]}>
        <div className={style["chat-content-setting-top"]}>
          <Image width={35} src={user} />
          <div className={style["chat-content-setting-userName"]}>
            {userInfo && userInfo.name}
          </div>
        </div>
        <div className={style["chat-content-setting-bottom"]}>
          <Icon onClick={logout} name="logout" />
        </div>
      </div>
    </>
  );
};

export default SettingLeft;
