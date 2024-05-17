import React from "react";
import { SketchPicker } from "react-color";
import style from "./index.module.less";

const CustomColors = (props: any) => {
  const { color, setColor, visible, setVisible } = props;
  const handleClick = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleChange = (color: { rgb: { r: any; g: any; b: any; a: any } }) => {
    setColor(
      `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    );
  };

  return (
    <div className={style.CustomColors}>
      <div className={style.swatch} onClick={handleClick}>
        <div className={style.color} style={{ background: color }} />
      </div>
      {visible ? (
        <div className={style.popover}>
          <div className="cover" onClick={handleClose} />
          <SketchPicker
            color={color}
            visible={visible}
            onChange={handleChange}
            onVisibleChange={(v: boolean) => setVisible(v)}
          />
        </div>
      ) : null}
    </div>
  );
};
export default CustomColors;
