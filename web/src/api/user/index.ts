import request from "@/utils/request";
import * as T from "./types";

const userApi: T.UserApi = {
  //登录
  getUser() {
    return request({
      url: "/getUser",
      method: "get"
    });
  },
  getUserInfo() {
    return request({
      url: "/getUserInfo",
      method: "get"
    });
  }
};

export default userApi;
