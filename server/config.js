const configs = {
    mysql: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',  // 自己设置的密码
        database: 'chat'
    },
    // 打印错误
    log: {
        error(message) {
            console.log('[knex error]', message)
        }
    }
}

module.exports = configs
