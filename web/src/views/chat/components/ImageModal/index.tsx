import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import style from "./index.module.less";
interface IProps {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  src?: string;
}
const ImageModal: React.FC<IProps> = ({ src, open, setOpen }) => {
  const onClose = () => {
    setOpen && setOpen(false);
  };
  const [imgStyle, setImgStyle] = useState({});
  useEffect(() => {
    const imgEl = document.querySelector(`.img-cont`) as HTMLImageElement;
    const { width: w, height: h } = imgEl;
    let o: {
      width?: string;
      height?: string;
    } = {
      width: "600px"
    };
    if (w < h) {
      o = {
        height: "600px"
      };
    }
    setImgStyle(o);
  }, []);

  return (
    <>
      <Modal
        className={style["image-modal"]}
        open={open}
        onOk={onClose}
        onCancel={onClose}
        width={600}
        footer={null}
      >
        <img className="img-cont" style={imgStyle} src={src} />
      </Modal>
    </>
  );
};

export default ImageModal;
