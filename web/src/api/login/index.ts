import request from "@/utils/request";
import * as T from "./types";

const loginApi: T.LoginApi = {
  //登录
  login(data) {
    return request({
      url: "/login",
      method: "post",
      data
    });
  }
};

export default loginApi;
