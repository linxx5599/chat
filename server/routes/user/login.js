const express = require('express');
const router = express.Router();

/* POST home page. */
const userController = require('../../controllers/user');
// 登录用户
router.post('/', userController.login);

module.exports = router;
