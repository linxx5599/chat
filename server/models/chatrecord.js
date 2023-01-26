const knex = require("../models/knex");

class Chatrecord {
  // 定义参数默认值为 chatrecord 表
  constructor(props = "chatrecord") {
    this.table = props;
  }
  // 根据uuid 查找聊天记录
  findAllChats(uuids, ...arg) {
    if (!uuids) return knex(this.table).select(...arg);
    return knex(this.table)
      .where("uuid", "in", uuids.split(","))
      .select(...arg);
  }
}

module.exports = new Chatrecord();
