const express = require('express');
const router = express.Router();

/* GET home page. */
// 获取用户信息
router.get('/', (req, res) => {
    res.send('index');
});

module.exports = router;
