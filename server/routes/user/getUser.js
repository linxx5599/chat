const express = require("express");
const router = express.Router();

/* GET home page. */
const userController = require("../../controllers/user");
// 获取用户信息
router.get("/", userController.showUser);

module.exports = router;
