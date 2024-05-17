import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { message } from "antd";
import { getToken, removeToken } from "@/utils/auth";
import { BASE_URL } from "@/utils/config";
import { isObject } from "@/utils";

// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
  },
  transformRequest: [
    function (data) {
      data = qs.stringify(data);
      return data;
    }
  ]
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    const { response } = error;
    const data = response ? response.data : error;
    if (response.status === 401) {
      message.warning("登录已过期，请重新登录");
      removeToken();
      // window.location.href = "/login";
    }
    const msg = isObject(data) ? data : { message: data };
    return Promise.reject(msg);
  }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
