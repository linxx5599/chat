const knex = require("../models/knex");
const fs = require("fs");
const path = require("path");
async function createTables() {
  try {
    const files = fs.readdirSync(__dirname);
    const promises = [];
    for (const file of files) {
      if (path.extname(file) === ".js" && file !== "index.js") {
        const entity = require(path.join(__dirname, file));
        const tableName = file.replace(/\.js$/, "");
        promises.push(checkAndCreateTable(tableName, entity));
      }
    }

    await Promise.all(promises);
    console.log("所有表创建完成");
  } catch (error) {
    console.error("创建表时发生错误:", error);
  } finally {
    knex.destroy();
  }
}

async function checkAndCreateTable(tableName, entity) {
  const exists = await knex.schema.hasTable(tableName);
  if (!exists) {
    await knex.schema.createTable(tableName, entity);
    console.log(`表 ${tableName} 创建成功`);
  }
}

createTables();
