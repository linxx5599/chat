// 引用用户模版数据
const User = require("../models/user");
const {
  getErrorMsg,
  successJson,
  errorJson,
  getUuid
} = require("../utils/index.js");
const { sign } = require("../common/index.js");
const { getOnlineData } = require("../socket");

const userController = {
  // showUser 获取用户数据并返回到页面
  async showUser(req, res, next) {
    try {
      const { uuid } = req.auth;
      const { itself } = req.query;
      const userData = await User.all(itself ? null : uuid, "name", "uuid");
      // userOnlineData
      userData.forEach((item) => {
        item.online = getOnlineData().some((i) => i.uuid === item.uuid);
      });
      successJson(res, {
        data: userData
      });
    } catch (e) {
      errorJson(res, { data: getErrorMsg(e) });
    }
  },
  // showUser 获取用户数据并返回到页面
  async showUserInfo(req, res, next) {
    try {
      const { uuid } = req.auth;
      if (!uuid) {
        errorJson(res, { message: "用户id不能为空" });
        return;
      }
      const userData = await User.info(uuid, "name", "uuid");
      const [data] = userData;
      if (!data) {
        errorJson(res, { message: "用户为空" });
        return;
      }
      successJson(res, {
        data
      });
    } catch (e) {
      errorJson(res, { data: getErrorMsg(e) });
    }
  },
  //创建用户
  async insertUser(req, res, next) {
    const userData = await User.all();
    if (userData.length > 20) {
      errorJson(res, { message: "用户创建已达到最大限制" });
      return;
    }
    try {
      const { body } = req;
      const { name, password } = body;
      if (!name || !password) {
        const errMsg = !name ? "用户名不能为空" : "密码不能为空";
        errorJson(res, { message: errMsg });
        return;
      }
      const findUser = userData.find((item) => item.name === name);
      if (findUser) {
        errorJson(res, { message: "用户已存在" });
        return;
      }

      const uuid = getUuid();
      const isInsert = await User.insert({ name, password, uuid });
      if (!isInsert) {
        errorJson(res);
        return;
      }
      successJson(res, {
        data: { name, uuid }
      });
    } catch (e) {
      errorJson(res);
    }
  },
  // 登录用户
  async login(req, res, next) {
    try {
      const userData = await User.all();
      const { body } = req;
      const { name, password } = body;
      if (!name || !password) {
        const errMsg = !name ? "用户名不能为空" : "密码不能为空";
        errorJson(res, { message: errMsg });
        return;
      }
      const findUser = userData.find((item) => item.name === name);
      if (!findUser) {
        errorJson(res, { message: "用户不存在" });
        return;
      }
      if (findUser.password != password) {
        errorJson(res, { message: "密码错误" });
        return;
      }
      const token = "Bearer " + sign({ uuid: findUser.uuid });
      successJson(
        res,
        {
          message: "登录成功"
        },
        { token }
      );
    } catch (e) {
      errorJson(res, { message: "登录失败" });
    }
  }
};

module.exports = userController;
