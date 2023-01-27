import React from "react";
import style from "./index.module.less";
import { Input, Button } from "antd";
import { userT } from "../../types";
import Icon from "@/common/components/Icon";
import ChatBoxMsg from "../ChatBoxMsg";
// 表情卡片 Emoticons
import Emoticons from "../Emoticons";

import { getIo, socketConfig } from "@/utils/socket";
import { getUuid } from "@/utils";

interface IProps {
  chatBoxMsgKey: string;
  checkUserInfo: userT | null;
  userInfo: userT | null;
  emoticonsOpen: boolean;
  setEmoticonsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  textAreaVal: string;
  setTextAreaVal: React.Dispatch<React.SetStateAction<string>>;
  textAreaElFocus: () => void;
}
const ChatMsg: React.FC<IProps> = ({
  chatBoxMsgKey,
  checkUserInfo,
  userInfo,
  emoticonsOpen,
  setEmoticonsOpen,
  textAreaVal,
  setTextAreaVal,
  textAreaElFocus
}) => {
  const send = () => {
    if (textAreaVal) {
      const io = getIo();
      const params = {
        message: encodeURIComponent(textAreaVal),
        name: userInfo?.name,
        msgId: getUuid(34, "msg_"),
        targetUuid: checkUserInfo?.uuid
      };
      io?.emit(socketConfig.types.SEND_USER_MSG, params);
      setTextAreaVal("");
    }
    textAreaElFocus();
  };
  return (
    <>
      <div className={style["chat-content-right-top"]}>
        <div>{checkUserInfo && checkUserInfo.name}</div>
        <span>{checkUserInfo?.online ? "在线" : "离线"}</span>
      </div>
      <div className={style["chat-content-right-content"]}>
        <ChatBoxMsg
          chatBoxMsgKey={chatBoxMsgKey}
          userInfo={userInfo}
          checkUserInfo={checkUserInfo}
        />
      </div>
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
