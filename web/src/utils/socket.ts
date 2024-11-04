import { DefaultEventsMap } from "@socket.io/component-emitter";
import { message } from "antd";
import socketIo, { Socket } from "socket.io-client";
import { getToken } from "./auth";

export const socketConfig = {
  socketUri: "http://localhost:3000",
  types: {
    //用户上线
    NOTICE_USER_ONLINE: "notice-user-online",
    //用户已登录
    NOTICE_LOGGED_IN: "notice-logged-in",
    //send-user 发送信息给服务端通知
    SEND_USER: "send-user",
    //发送聊天信息给服务端
    SEND_USER_MSG: "send-user-msg",
    //发送信息成功/失败回调
    NOTICE_SEND_MSG: "notice-send-msg"
  }
};

let isConnect = false;
let socket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;
export const getIo = () => socket;
export default function (userInfo: any, opts?: { setSocketMessages?: any }) {
  if (!userInfo || isConnect) return;
  isConnect = true;
  disconnect();
  const { setSocketMessages } = opts || {};
  socket = socketIo(socketConfig.socketUri + `?token=${getToken()}`);
  socket.on("connect", () => {
    if (!socket) return;
    socket.emit(socketConfig.types.SEND_USER, {
      uuid: userInfo.uuid
    });
    console.log("%c监听客户端连接成功-connect", "color: red");
  });
  //用户上线
  socket.on(socketConfig.types.NOTICE_USER_ONLINE, (data) => {
    setSocketMessages?.({ type: socketConfig.types.NOTICE_USER_ONLINE, data });
  });
  //用户已登录
  socket.on(socketConfig.types.NOTICE_LOGGED_IN, (data) => {
    setSocketMessages?.({ type: socketConfig.types.NOTICE_LOGGED_IN, data });
  });
  //发送信息接收回调
  socket.on(socketConfig.types.NOTICE_SEND_MSG, (data) => {
    if (data.status === "fail") {
      message.error("发送失败");
      return;
    }
    setSocketMessages?.({
      type: socketConfig.types.NOTICE_SEND_MSG,
      data
    });
    console.log(data.msgId, "：发送成功");
  });

  socket.on("disconnect", () => {
    console.log("%c服务端断开连接", "color: red");
    setSocketMessages?.(null);
    isConnect = false;
  });
}
export const disconnect = () => {
  if (socket) {
    console.log("%c客户端主动断开连接", "color: red");
    socket.disconnect();
    socket = null;
  }
};
