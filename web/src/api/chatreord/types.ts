export interface ChatsParams {
  uuids?: string;
  isAll?: boolean;
}
export interface ChatrecordApi {
  getChats: (params?: ChatsParams) => Promise<any>;
}
