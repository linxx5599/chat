const knex = require("../models/knex");
module.exports = function (table) {
  table.string("uuid", 36).notNullable().unique().primary();
  table.string("name", 255).notNullable();
  table.string("password", 255).notNullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
};
