const http = require("http");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./logger");

// const indexRouter = require("./routes/index");
const getUserInfoRouter = require("./routes/user/getUserInfo");
const getUserRouter = require("./routes/user/getUser");
const insertUser = require("./routes/user/insertUser");
const loginRouter = require("./routes/user/login");

const chatsRouter = require("./routes/chatrecord/chats");

const bodyParser = require("body-parser");
const { expressjwt } = require("express-jwt");
const { JWT_SELECT } = require("./utils/config");
const { socketIoServer } = require("./socket");
const app = express();
const server = http.createServer(app);
socketIoServer(server);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morgan("dev"));
//处理跨域
app.use(require("cors")());
// unless指定哪些接口不需要访问权限，即白名单。
app.use(
  expressjwt({ secret: JWT_SELECT, algorithms: ["HS256"] }).unless({
    path: ["/login", "/insertUser"]
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

app.use("/chats", chatsRouter);

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
