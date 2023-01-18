export interface LoginParams {
  name: string;
  password: string;
}
export interface LoginApi {
  login: (params: LoginParams) => Promise<any>;
}
