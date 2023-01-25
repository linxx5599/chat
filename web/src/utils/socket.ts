import io from "socket.io-client";
const socketUri = "http://localhost:3000";
const socket = io(socketUri);

socket.on("connect", () => {
  console.log(socket.id, "监听客户端连接成功-connect");
});
socket.on("message", (data) => {
  // 自定义一个事件来获取，服务端推送回来的消息列表
  console.log(data, "222");
});
socket.emit("send-message", 11);
export default socket;
