import io from "socket.io-client";
import { BASE_URL } from "@/utils/config";
const socket = io(`${BASE_URL}`);
socket.on("connect", () => {
  console.log(socket.id, "监听客户端连接成功-connect");
});
socket.on("fresh-message", (data) => {
  // 自定义一个事件来获取，服务端推送回来的消息列表
  console.log(data, "");
});
export default socket;
