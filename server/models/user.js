const Base = require("./base");
const knex = require("../models/knex");

class User extends Base {
  // 定义参数默认值为 user 表
  constructor(props = "user") {
    super(props);
    const tableName = props;
    knex.schema.hasTable(tableName).then((exists) => {
      if (!exists) {
        return knex.schema
          .createTable(tableName, (table) => {
            table.string('uuid', 36).notNullable().unique().primary();
            table.string("name", 255).notNullable();
            table.string("password", 255).notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
          })
          .finally(() => {
            knex.destroy();
          });
      }
    });
  }
}

module.exports = new User();
