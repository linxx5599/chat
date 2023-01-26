import { DefaultEventsMap } from "@socket.io/component-emitter";
import io, { Socket } from "socket.io-client";

let isConnect = false;
export default function (userInfo: any) {
  if (!userInfo || isConnect) return;
  isConnect = true;
  const socketUri = "http://localhost:3000";
  const socket: Socket<DefaultEventsMap, DefaultEventsMap> = io(socketUri);
  socket.on("connect", () => {
    socket.emit("send-user", { uuid: userInfo.uuid });
    console.log(socket.id, "监听客户端连接成功-connect");
  });
  socket.on("message", (data) => {
    // 自定义一个事件来获取，服务端推送回来的消息列表
    console.log(data, "222");
  });
  socket.on("disconnect", () => {
    console.log("断开连接");
    isConnect = false;
  });
}
