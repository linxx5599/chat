const knex = require('../models/knex');

class Base {
    constructor(props) {
        this.table = props;
    }

    // 查找
    all(...arg) {
        return knex(this.table).select(...arg);
    }

    // 新增
    insert(params) {
        return knex(this.table).insert(params);
    }
    
    // 详情
    info(uuid, ...arg) {
        return knex(this.table).where('uuid', '=', uuid).select(...arg);
    }

    // 更改
    update(uuid, params) {
        return knex(this.table).where('uuid', '=', uuid).update(params);
    }

    // 删除
    delete(id) {
        return knex(this.table).where('id', '=', id).del();
    }

}

module.exports = Base;
