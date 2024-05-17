import React from "react";
import { Spin } from "antd";
import style from "./index.module.less";
import { useTranslation } from "react-i18next";
const Loding: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className={style.loading}>
      <Spin tip={t("loading")} />
    </div>
  );
};
export default Loding;
