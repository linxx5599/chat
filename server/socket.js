const { Server: ioServer } = require("socket.io");
module.exports = (server) => {
  // const dayjs = require("dayjs");
  const socketConfig = {
    types: {
      //用户上线
      NOTICE_USER_ONLINE: "notice-user-online",
      //用户已登录
      NOTICE_LOGGED_IN: "notice-logged-in",
      //send-user 发送信息给服务端通知
      SEND_USER: "send-user"
    }
  };

  // 创建实时连接
  const io = new ioServer(server, {
    cors: {
      origin: "*"
    }
  });
  //在线人数的用户
  let userOnlineData = [];
  // 监听连接
  io.on("connection", async (socket) => {
    console.log(`⚡: ${socket.id} 用户已连接!`);
    socket.on(socketConfig.types.SEND_USER, async ({ uuid, token }) => {
      // console.log(uuid, "uuid", await User.all());
      const loggedInItem = userOnlineData.find(
        (i) => i.uuid === uuid && i.token !== token
      );
      //其他用户登录已登录的用户
      if (loggedInItem) {
        socket.emit(socketConfig.types.NOTICE_LOGGED_IN, loggedInItem);
        return;
      }
      if (!userOnlineData.some((i) => i.uuid === uuid)) {
        socket.uuid = uuid;
        userOnlineData.push({ socketId: socket.id, uuid, token });
      }
      io.emit(
        socketConfig.types.NOTICE_USER_ONLINE,
        userOnlineData.map(({ socketId, uuid }) => ({ socketId, uuid }))
      );
    });
    socket.on("disconnect", () => {
      userOnlineData = userOnlineData.filter((i) => i.uuid !== socket.uuid);
      console.log("🔥: 一个用户已断开连接");
    });
  });
};
