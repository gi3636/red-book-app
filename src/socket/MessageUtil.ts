import { ChatMsg, DataContent, MessageActionType } from './SocketType'

export function createMessage(action: MessageActionType, chatMsg: ChatMsg, extend: string): DataContent {
  let message: DataContent = {
    action: 1,
    chatMsg: {
      senderId: '1',
      receiverId: '2',
      msg: 'ping',
      msgId: '1'
    },
    extend: '1'
  }
  return message
}
