import React, { useState, useMemo } from "react";
import { theme, Button } from "antd";
import variableCss from "@/utils/variableCss";
import Icon from "@/common/components/Icon";
import style from "./index.module.less";
import ColorPicker from "@/common/components/ColorPicker";
const SwitchThemeDrawer: React.FC = (props: any) => {
  const { switchThemeColor } = props;

  const { token } = theme.useToken();
  variableCss(token);

  const [open, setOpen] = useState(false);
  const settingClick = () => setOpen(!open);
  const colorPrimary = theme.useToken().token.colorPrimary;
  const [color, setColor] = useState(colorPrimary);
  const [visible, setVisible] = useState(false);
  useMemo(() => {
    !open && visible && setVisible(false);
    !open && color !== colorPrimary && setColor(colorPrimary);
  }, [open]);
  const onClick = () => {
    setVisible(false);
    switchThemeColor && switchThemeColor(color);
  };
  return (
    <div className={`${style.themeSettingBox} ${open ? style.open : ""}`}>
      <div className={style.themeSetting} onClick={settingClick}>
        <Icon name={open ? "close" : "setting"} style={{ fill: "#fff" }} />
      </div>
      <div className={style.themeSettingItems}>
        <div className="title">主题色切换</div>
        <ColorPicker
          color={color}
          setColor={setColor}
          visible={visible}
          setVisible={setVisible}
        />
        <Button
          type="primary"
          style={{ position: "absolute", bottom: "16px", right: "24px" }}
          onClick={onClick}
        >
          确定
        </Button>
      </div>
    </div>
  );
};

export default SwitchThemeDrawer;
