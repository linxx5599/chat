const knex = require("../models/knex");

class Chatrecord {
  // 定义参数默认值为 chatrecord 表
  constructor(props = "chatrecord") {
    this.table = props;
  }
  // 根据uuid 查找聊天记录
  findAllChats({ uuid, targetUuid }, ...arg) {
    if (!targetUuid) return knex(this.table).select(...arg);
    return knex(this.table)
      .where((builder) =>
        builder.where("uuid", uuid).andWhere("targetUuid", targetUuid)
      )
      .orWhere((builder) =>
        builder.where("uuid", targetUuid).andWhere("targetUuid", uuid)
      )
      .orderBy("time", "asc")
      .select(...arg);
  }
  // 添加
  sendChats(params) {
    return knex(this.table).insert(params);
  }
}

module.exports = new Chatrecord();
