const express = require('express');
const router = express.Router();

/* GET home page. */
const chatrecordController = require("../../controllers/chatrecord");
// 获取用户信息
router.get("/", chatrecordController.findAllChats);

module.exports = router;
