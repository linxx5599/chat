import React, { useState, useMemo } from "react";
import style from "./index.module.less";

import { List, Image } from "antd";
import VirtualList from "rc-virtual-list";
import { userT } from "../../types";
import dayjs from "dayjs";

import { chatrecordApi } from "@/api";

interface IProps {
  chatBoxMsgKey: string;
  checkUserInfo: userT | null;
  userInfo: userT | null;
}
interface UserItem {
  msgId: string;
  time: string;
  message: string;
  uuid: string;
  name: string;
  msg: string;
}

const ContainerHeight = 400;

const ChatBoxMsg: React.FC<IProps> = ({
  chatBoxMsgKey,
  checkUserInfo,
  userInfo
}) => {
  const user = require("@/assets/images/user.png").default;

  const [chatData, setChatData] = useState<UserItem[]>([]);

  const getChats = (scroll?: boolean) => {
    chatrecordApi
      .getChats({ targetUuid: checkUserInfo?.uuid as string })
      .then((result) => {
        const data = scroll ? chatData.concat(result.data) : result.data;
        setChatData(data);
        setTimeout(() => {
          const el = document.querySelector(
            "." + style["chat-content-right-content-msg"]
          );
          if (!el) return;
          const scrollTop = 88.73 * data.length - 400;
          if (scrollTop < 0) return;
          el.scrollTop = scrollTop;
        });
      });
  };

  useMemo(() => {
    if (!checkUserInfo) return;
    getChats();
  }, [checkUserInfo]);
  useMemo(() => {
    if (chatBoxMsgKey === "123456") return;
    getChats();
  }, [chatBoxMsgKey]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const { currentTarget } = e;
    if (
      currentTarget.scrollHeight - currentTarget.scrollTop ===
      ContainerHeight
    ) {
      getChats(true);
    }
  };

  return (
    <>
      <List
        className={style["chat-content-right-content-msg"]}
        dataSource={chatData}
        renderItem={(item: UserItem) => (
          <List.Item key={item.msgId}>
            <List.Item.Meta
              className={item.uuid === userInfo?.uuid ? "self" : ""}
              avatar={<Image width={35} src={user} />}
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection:
                      item.uuid === userInfo?.uuid ? "row-reverse" : "unset"
                  }}
                >
                  <span>{item.name}</span>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "12px",
                      marginRight: item.uuid === userInfo?.uuid ? "8px" : "0",
                      marginLeft: item.uuid === userInfo?.uuid ? "0" : "8px"
                    }}
                  >
                    {dayjs(item.time).format("M月D日") +
                      " " +
                      dayjs(item.time).format("HH:mm")}
                  </span>
                </div>
              }
              description={decodeURIComponent(item.message)}
            />
          </List.Item>
        )}
      >
        {/* <VirtualList
          className={style["chat-content-right-content-msg"]}
          data={chatData}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="msgId"
        > */}

        {/* </VirtualList> */}
      </List>
    </>
  );
};

export default ChatBoxMsg;
