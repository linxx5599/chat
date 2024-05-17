const express = require("express");
const router = express.Router();

/* GET home page. */
const userController = require("../../controllers/user");
// 获取用户信息
router.get("/", userController.showUserInfo);

module.exports = router;
