import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import { getToken } from "@/utils/auth";
// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BASE_ENV,
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
    return response;
  },
  (error: any) => {
    const { response } = error;
    const data = response ? response.data : error;
    return Promise.reject(data);
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
