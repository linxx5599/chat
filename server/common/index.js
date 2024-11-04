const jwt = require("jsonwebtoken");
const {
  JWT_TOKEN_NAME,
  JWT_EXPIRATION,
  JWT_SELECT
} = require("../utils/config");

//生成签名
function sign(data) {
  try {
    return jwt.sign(data, JWT_SELECT, { expiresIn: JWT_EXPIRATION });
  } catch (error) {
    throw new Error("加密失败");
  }
}
function verify(token) {
  try {
    return jwt.verify(token, JWT_SELECT);
  } catch (error) {
    throw new Error("解密失败");
  }
}

// 设置token
function setToken(data, res) {
  const token = sign(data);
  res.cookie(JWT_TOKEN_NAME, token, {
    maxAge: 1000 * JWT_EXPIRATION,
    httpOnly: true
  });
}
module.exports = {
  sign,
  setToken,
  verify,
};
