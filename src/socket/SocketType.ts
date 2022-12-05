export enum SocketEventType {
  send,
  connecting,
  connected,
  reconnecting,
  reconnected,
  reconnect_failed,
  close,
  error,
  ping,
  pong
}

export enum MessageActionType {
  CONNECT = 1, //初始化链接
  CHAT = 2, //聊天消息
  SIGNED = 3, //消息签收
  KEEPALIVE = 4, //客户端保持心跳
  PULL_FRIEND = 5 //拉取好友
}

export interface ChatMsg {
  senderId: string //发送者的用户id
  receiverId?: string //接收者的用户id
  msg: string //聊天内容
  msgId?: string //消息id
}

export interface DataContent {
  action: MessageActionType
  chatMsg: ChatMsg
  extend: string //扩展字段
}

export const MessageCenterEvent = {
  System: {
    Logined: 'System.Logined',
    LoginError: 'System.LoginError',
    Reconnecting: 'System.Reconnecting',
    Reconnected: 'System.Reconnected',
    Disreconnect: 'System.Disreconnect',
    ReconnectFailed: 'System.ReconnectFailed'
  },
  Message: {
    Notice: 'Message.Notice',
    Update: 'Message.Update',
    Will: 'Message.Will',
    Failed: 'Message.Failed',
    Chat: 'Message.Chat',
    Sync: 'Message.Sync',
    Read: 'Message.Read'
  },
  Order: {}
}
