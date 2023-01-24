import React, { useState, useEffect } from "react";
import style from "./index.module.less";

import { List, Image } from "antd";
import VirtualList from "rc-virtual-list";
import { userT } from "../../types";

interface IProps {
  checkUserInfo: userT | null;
}
interface UserItem {
  uuid: string;
  name: string;
  msg: string;
}

const ContainerHeight = 400;

const ChatBoxMsg: React.FC<IProps> = ({ checkUserInfo }) => {
  const user = require("@/assets/images/user.png").default;

  const [chatData, setChatData] = useState<UserItem[]>([
    { uuid: "1", name: "sd", msg: "呵呵" },
    { uuid: "c980dc1acff3404087562281eec449ea", name: "sd", msg: "ggggggggff" }
  ]);

  const appendData = () => {
    fetch("")
      .then((res) => res.json())
      .then((body) => {
        setChatData(chatData.concat(body.results));
      });
  };

  useEffect(() => {
    // appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const { currentTarget } = e;
    if (
      currentTarget.scrollHeight - currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
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
          itemKey="uuid"
          onScroll={onScroll}
        >
          {(item: UserItem) => (
            <List.Item key={item.uuid}>
              <List.Item.Meta
                className={item.uuid === checkUserInfo?.uuid ? "self" : ""}
                avatar={<Image width={35} src={user} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.msg}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};

export default ChatBoxMsg;
