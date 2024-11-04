const knex = require("../models/knex");
module.exports = function (table) {
  table.string("msgId", 255).notNullable().unique().primary();
  table.string("uuid", 36).notNullable().primary();
  table.string("targetUuid", 36).notNullable().primary();
  table.string("name", 255).notNullable();
  table.string("message", 625);
  table.timestamp("time").defaultTo(knex.fn.now());
};
