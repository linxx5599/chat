export interface ChatsParams {
  targetUuid: string;
  isAll?: boolean;
}
export interface ChatrecordApi {
  getChats: (params: ChatsParams) => Promise<any>;
}
