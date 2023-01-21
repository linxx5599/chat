import React, { useState } from "react";
import { theme, Drawer } from "antd";
import variableCss from "@/utils/variableCss";
const SwitchThemeDrawer: React.FC = () => {
  const { token } = theme.useToken();
  variableCss(token);

  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Drawer
        title="主题切换"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default SwitchThemeDrawer;
