export interface LoginParams {
  name: string;
  password: string;
}
export interface LoginApi {
  login: (params: LoginParams) => Promise<any>;
  insertUser: (params: LoginParams) => Promise<any>;
}
