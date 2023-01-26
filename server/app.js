const http = require("http");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./logger");

// const indexRouter = require("./routes/index");
const getUserInfoRouter = require("./routes/getUserInfo");
const getUserRouter = require("./routes/getUser");
const insertUser = require("./routes/insertUser");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const bodyParser = require("body-parser");
const { expressjwt } = require("express-jwt");
const { JWT_SELECT } = require("./utils/config");
const app = express();
const { Server: ioServer } = require("socket.io");
const dayjs = require("dayjs");

const server = http.createServer(app);

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

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morgan("dev"));
//处理跨域
app.use(require("cors")());
// unless指定哪些接口不需要访问权限，即白名单。
app.use(
  expressjwt({ secret: JWT_SELECT, algorithms: ["HS256"] }).unless({
    path: ["/login"]
  })
);

app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/getUserInfo", getUserInfoRouter);
app.use("/getUser", getUserRouter);
app.use("/insertUser", insertUser);
app.use("/login", loginRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

const _errorHandler = (err, req, res, next) => {
  const { method, originalUrl } = req;
  const errorMsg = err.status === 401 ? "登录过期" : err.message;
  logger.error(`${method} ${originalUrl} ${errorMsg}`);
  res.status(err.status || 500).json({
    code: -1,
    message: errorMsg,
    data: null
  });
};
app.use(_errorHandler);
module.exports = { server };
