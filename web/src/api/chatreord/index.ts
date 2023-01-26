import request from "@/utils/request";
import * as T from "./types";

const chatrecordApi: T.ChatrecordApi = {
  getChats(params) {
    return request({
      url: "/chats",
      method: "get",
      params
    });
  }
};

export default chatrecordApi;
