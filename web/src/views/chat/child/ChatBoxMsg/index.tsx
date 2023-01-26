import React, { useState, useEffect, useMemo } from "react";
import style from "./index.module.less";

import { List, Image } from "antd";
import VirtualList from "rc-virtual-list";
import { userT } from "../../types";

import { chatrecordApi } from "@/api";

interface IProps {
  checkUserInfo: userT | null;
  userInfo: userT | null;
}
interface UserItem {
  time: string;
  message: string;
  uuid: string;
  name: string;
  msg: string;
}

const ContainerHeight = 400;

const ChatBoxMsg: React.FC<IProps> = ({ checkUserInfo, userInfo }) => {
  const user = require("@/assets/images/user.png").default;

  const [chatData, setChatData] = useState<UserItem[]>([]);

  const getChats = (scroll?: boolean) => {
    chatrecordApi
      .getChats({ uuids: `${userInfo?.uuid},${checkUserInfo?.uuid}` })
      .then((result) => {
        const data = scroll ? chatData.concat(result.data) : result.data;
        setChatData(data);
      });
  };

  useMemo(() => {
    if (!checkUserInfo) return;
    getChats();
  }, [checkUserInfo]);

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
      <List>
        <VirtualList
          className={style["chat-content-right-content-msg"]}
          data={chatData}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="time"
          onScroll={onScroll}
        >
          {(item: UserItem) => (
            <List.Item key={item.uuid + item.time}>
              <List.Item.Meta
                className={item.uuid === userInfo?.uuid ? "self" : ""}
                avatar={<Image width={35} src={user} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.message}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};

export default ChatBoxMsg;
