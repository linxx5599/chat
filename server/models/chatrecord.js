const knex = require("../models/knex");

class Chatrecord {
  // 定义参数默认值为 chatrecord 表
  constructor(props = "chatrecord") {
    this.table = props;
    knex.schema.hasTable(props).then((exists) => {
      if (!exists) {
        return knex.schema
          .createTable(props, (table) => {
            table.string('msgId', 255).notNullable().unique().primary();
            table.string('uuid', 36).notNullable().primary();
            table.string('targetUuid', 36).notNullable().primary();
            table.string("name", 255).notNullable();
            table.string("message", 625);
            table.timestamp("time").defaultTo(knex.fn.now());
          })
          .finally(() => {
            knex.destroy();
          });
      }
    });
  }
  // 根据uuid 查找聊天记录
  findAllChats({ uuid, targetUuid }, ...arg) {
    if (!targetUuid) return knex(this.table).select(...arg);
    return knex(this.table)
      .where((builder) =>
        builder.where("uuid", uuid).andWhere("targetUuid", targetUuid)
      ).orWhere((builder) =>
        builder.where("uuid", targetUuid).andWhere("targetUuid", uuid)
      )
      .select(...arg);
  }
  // 添加
  sendChats(params) {
    return knex(this.table).insert(params);
  }
}

module.exports = new Chatrecord();
