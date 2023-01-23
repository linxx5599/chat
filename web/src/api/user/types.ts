export interface UserApi {
  getUser: () => Promise<any>;
  getUserInfo: () => Promise<any>;
}
