const Chatrecord = require("../models/chatrecord");
const { getErrorMsg, successJson, errorJson } = require("../utils/index.js");

const chatrecordController = {
  // findAllChats 获取用户聊天记录
  async findAllChats(req, res, next) {
    try {
      const { uuids, isAll } = req.query;
      if (!uuids && !isAll) {
        errorJson(res, { data: getErrorMsg("用户id不能为空") });
        return;
      }
      const userData = await Chatrecord.findAllChats(uuids);
      successJson(res, {
        data: userData
      });
    } catch (e) {
      errorJson(res, { data: getErrorMsg(e) });
    }
  }
};

module.exports = chatrecordController;
