const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user');
// 获取用户信息
router.post('/', userController.insertUser);

module.exports = router;
