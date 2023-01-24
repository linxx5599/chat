import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { theme, Button, Descriptions, Select } from "antd";

import { useTranslation } from "react-i18next";

import variableCss from "@/utils/variableCss";
import Icon from "@/common/components/Icon";
import style from "./index.module.less";
import ColorPicker from "@/common/components/ColorPicker";
import langJs from "@/lang";
interface IProps {
  locale: "zh" | "en";
  switchLang: (lan: IProps["locale"]) => void;
  switchThemeColor: (color?: string) => void;
}
const SwitchSettingDrawer: React.FC<IProps> = (props: any) => {
  const { switchThemeColor, locale, switchLang } = props;

  const { t } = useTranslation();

  const { token } = theme.useToken();

  const [open, setOpen] = useState(false);
  const settingClick = () => setOpen(!open);
  const colorPrimary = theme.useToken().token.colorPrimary;

  // //切换语言
  const [lang, setLang] = useState(locale);

  //切换主题
  const [color, setColor] = useState(colorPrimary);
  //控制打开、关闭主题组件
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    variableCss(token);
  }, [color]);

  useMemo(() => {
    !open && visible && setVisible(false);
    !open && color !== colorPrimary && setColor(colorPrimary);
    !open && lang !== locale && setLang(locale);
  }, [open]);
  const onClick = () => {
    setVisible(false);
    switchThemeColor && switchThemeColor(color);
    switchLang && switchLang(lang);
    langJs();
    open && setOpen(false);
  };

  const location = useLocation();
  if (location.pathname === "/login") {
    return <></>;
  }
  return (
    <div className={`${style.themeSettingBox} ${open ? style.open : ""}`}>
      <div className={style.themeSetting} onClick={settingClick}>
        <Icon name={open ? "close" : "setting"} style={{ fill: "#fff" }} />
      </div>
      <div className={style.themeSettingItems}>
        <div className="title">{t("setting")}</div>
        <Descriptions column={1}>
          <Descriptions.Item label={t("lang")}>
            <Select
              style={{ width: 100 }}
              value={lang}
              onChange={(v) => setLang(v)}
              options={[
                { value: "zh", label: "中文" },
                { value: "en", label: "English" }
              ]}
            />
          </Descriptions.Item>
          <Descriptions.Item label={t("themeColor")}>
            <ColorPicker
              color={color}
              setColor={setColor}
              visible={visible}
              setVisible={setVisible}
            />
          </Descriptions.Item>
        </Descriptions>

        <Button
          type="primary"
          style={{ position: "absolute", bottom: "16px", right: "24px" }}
          onClick={onClick}
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  );
};

export default SwitchSettingDrawer;
