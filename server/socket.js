const { Server: ioServer } = require("socket.io");
const chatrecordController = require("./controllers/chatrecord");
const dayjs = require("dayjs");
const { asyncFn } = require("./utils");
const socketConfig = {
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

//在线人数的用户
let userOnlineData = [];
module.exports = {
  getOnlineData: () => userOnlineData,
  socketIoServer: (server) => {
    // 创建实时连接
    const io = new ioServer(server, {
      cors: {
        origin: "*"
      }
    });

    // 监听连接
    io.on("connection", async (socket) => {
      console.log(`⚡: ${socket.id} 用户已连接!`);
      socket.on(socketConfig.types.SEND_USER, ({ uuid, token }) => {
        socket.uuid = uuid;
        // console.log(uuid, "uuid", await User.all());
        const loginUser = userOnlineData.find(
          (i) => i.uuid === uuid && i.token !== token
        );
        //其他用户登录已登录的用户
        if (loginUser) {
          socket.emit(socketConfig.types.NOTICE_LOGGED_IN, loginUser);
          return;
        }
        //同一个登录用户 既:同一个浏览器多个窗口打开的同个账号
        const sameLoginUserIndex = userOnlineData.findIndex(
          (i) => i.uuid === uuid && i.token === token
        );
        if (sameLoginUserIndex > -1) {
          userOnlineData[sameLoginUserIndex].socketIds.push(socket.id);
        }
        if (!userOnlineData.some((i) => i.uuid === uuid)) {
          userOnlineData.push({ socketIds: [socket.id], uuid, token });
        }
        //返回数据 去掉自己的数据列表
        // const emitOnlineData = userOnlineData.reduce((curr, item) => {
        //   const { socketIds } = item;
        //   if (item.uuid !== uuid) {
        //     curr.push({ socketIds, uuid: item.uuid });
        //   }
        //   return curr;
        // }, []);
        //通知用户需要刷新数据
        io.emit(
          socketConfig.types.NOTICE_USER_ONLINE,
          { status: "success", uuid: socket.uuid }
        );
      });

      socket.on(socketConfig.types.SEND_USER_MSG, async ({ message, msgId, name }) => {
        const params = {
          message,
          msgId,
          time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          uuid: socket.uuid,
          name
        }
        const [error] = await asyncFn(chatrecordController.sendChats(params))
        const status = error ? 'fail' : 'success'
        io.emit(socketConfig.types.NOTICE_SEND_MSG, { status, msgId, uuid: socket.uuid })
      });
      socket.on("disconnect", () => {
        //在线用户列表中找出离线的用户索引
        const userOnlineIndex = userOnlineData.findIndex(
          (i) => i.uuid === socket.uuid
        );
        if (userOnlineIndex > -1) {
          //去掉用户里的其中一个socketId
          userOnlineData[userOnlineIndex].socketIds = userOnlineData[
            userOnlineIndex
          ].socketIds.filter((i) => i !== socket.id);
          //用户里的socketId 为空则代表需要下线
          if (!userOnlineData[userOnlineIndex].socketIds.length) {
            userOnlineData = userOnlineData.filter(
              (i) => i.uuid !== socket.uuid
            );
            //数据全部为空则不需要通知然后用户更新数据了
            if (userOnlineData.length === 0) return;
            //通知用户需要刷新数据
            io.emit(socketConfig.types.NOTICE_USER_ONLINE, { status: "success", uuid: socket.uuid });
          }
        }
        console.log("🔥: 一个用户已断开连接");
      });
    });
  }
};
