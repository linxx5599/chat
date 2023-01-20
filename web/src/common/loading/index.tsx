import React from "react";
import { Spin } from "antd";
import "./index.less";
const Loding: React.FC = () => {
  return (
    <div className="example">
      <Spin tip="加载中..." />
    </div>
  );
};
export default Loding;
