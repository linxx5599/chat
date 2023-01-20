import React from "react";
import { Spin } from "antd";
import style from "./index.module.less";
const Loding: React.FC = () => {
  return (
    <div className={style.loading}>
      <Spin tip="加载中..." />
    </div>
  );
};
export default Loding;
