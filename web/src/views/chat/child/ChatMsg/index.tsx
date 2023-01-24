import React from "react";
import style from "./index.module.less";
import { Input, Button } from "antd";
import Icon from "@/common/components/Icon";
// 表情卡片 Emoticons
import Emoticons from "../Emoticons";
import { userT } from "../../types";

interface IProps {
  checkUserInfo: userT | null;
  emoticonsOpen: boolean;
  setEmoticonsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  textAreaVal: string;
  setTextAreaVal: React.Dispatch<React.SetStateAction<string>>;
  textAreaElFocus: () => void;
}
const ChatMsg: React.FC<IProps> = ({
  checkUserInfo,
  emoticonsOpen,
  setEmoticonsOpen,
  textAreaVal,
  setTextAreaVal,
  textAreaElFocus
}) => {
  const send = () => {
    console.log(textAreaVal, "send");
    setTextAreaVal("");
    textAreaElFocus();
  };
  return (
    <>
      <div className={style["chat-content-right-top"]}>
        <div>{checkUserInfo && checkUserInfo.name}</div>
      </div>
      <div className={style["chat-content-right-content"]}></div>
      <div
        className={`${style["chat-content-right-footer"]} ${
          emoticonsOpen ? style["check"] : ""
        }`}
      >
        <div className={style["chat-content-right-footer-top"]}>
          <Emoticons
            textAreaVal={textAreaVal}
            setTextAreaVal={setTextAreaVal}
            open={emoticonsOpen}
            setOpen={setEmoticonsOpen}
          >
            <Icon name="smilingFace"></Icon>
          </Emoticons>

          <Button onClick={send} type="primary" size="small">
            发送
          </Button>
        </div>
        <Input.TextArea
          value={textAreaVal}
          onChange={(e) => setTextAreaVal(e.target.value)}
          className={
            style["chat-content-right-footer-edit"] +
            " chat-content-right-footer-edit"
          }
          autoFocus
        />
      </div>
    </>
  );
};

export default ChatMsg;
