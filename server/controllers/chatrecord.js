const Chatrecord = require("../models/chatrecord");
const { getErrorMsg, successJson, errorJson } = require("../utils/index.js");

const chatrecordController = {
  // findAllChats 获取用户聊天记录
  async findAllChats(req, res, next) {
    try {
      const { targetUuid, isAll } = req.query;
      const { uuid } = req.auth;
      if (!targetUuid && !isAll) {
        errorJson(res, { data: getErrorMsg("targetUuid不能为空") });
        return;
      }
      const userData = await Chatrecord.findAllChats({ uuid, targetUuid });
      successJson(res, {
        data: userData
      });
    } catch (e) {
      errorJson(res, { data: getErrorMsg(e) });
    }
  },
  sendChats(params) {
    return Chatrecord.sendChats(params);
  }
};

module.exports = chatrecordController;
