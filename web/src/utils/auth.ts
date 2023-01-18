import cookie from "js-cookie";
import { JWT_TOKEN_NAME } from "./config";

//获取token
export function getToken() {
  return cookie.get(JWT_TOKEN_NAME);
}

//保存token
export function setToken(token: string) {
  return cookie.set(JWT_TOKEN_NAME, token);
}

//删除token
export function removeToken() {
  return cookie.remove(JWT_TOKEN_NAME);
}
