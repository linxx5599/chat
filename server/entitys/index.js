const knex = require("../models/knex");
// 动态读取当前目录下的js文件名称
const fs = require("fs");
const path = require("path");
const files = fs.readdirSync(__dirname);
for (const file of files) {
  if (path.extname(file) === ".js" && file !== "index.js") {
    const entity = require(path.join(__dirname, file));
    const entityName = file.replace(/\.js$/, "");
    knex.schema.hasTable(entityName).then((exists) => {
      if (!exists) {
        return knex.schema.createTable(entityName, entity).finally(() => {
          knex.destroy();
        });
      }
    });
  }
}
