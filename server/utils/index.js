module.exports = {
  isObject(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  },
  getErrorMsg(e) {
    const errorMsg = e["errno"] === -4078 ? "服务器报错" : e;
    return errorMsg;
  },
  //处理成功
  successJson(res, opts = {}, obj = {}) {
    const { code = 200, message = "操作成功", data = null } = opts;
    res.json({ code, message, data, ...obj });
  },
  //处理错误
  errorJson(res, opts = {}, obj = {}) {
    const { code = 0, message = "操作失败", data = null } = opts;
    res.status(400);
    res.json({ code, message, data, ...obj });
  },
  //随机生成uuid
  getUuid(num = 36, str = "") {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < num; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    let uuid = s.join("");
    uuid = uuid.split("-").join("");
    return str + uuid;
  },

  asyncFn(fn) {
    return new Promise((resolve) => {
      fn.then((result) => resolve([null, result])).catch((error) =>
        resolve([error || true, null])
      );
    });
  },
};
