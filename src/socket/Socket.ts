import { socketUrl } from '@/common/config'
import { DataContent, MessageActionType } from './SocketType'

class Socket {
  private _connection: any // WebSocket实体
  private startHeartBeaTimer: any // 心跳定时器

  // 链接初始化
  connect = () => {
    this._connection = new WebSocket(socketUrl)
    this._connection.onopen = this.onOpen
    this._connection.onmessage = this.onMessage
    this._connection.onerror = this.onError
    this._connection.onclose = this.onClose
  }

  // 链接成功
  onOpen = (event: any) => {
    console.log('socket 已连接' + event)
    this.startHeartBeat()
  }

  // 收到消息
  onMessage = (event: any) => {
    console.log('socket 收到信息', event)
  }

  // 链接失败
  onError = (event: any) => {
    console.log('socket 错误', event)
    this.stopHeartBeat()
  }

  // 链接关闭
  onClose = (event: any) => {
    console.log('socket 关闭', event)
    this.stopHeartBeat()
  }

  // 发送消息
  send = (payload: DataContent) => {
    console.log('信息发送中', JSON.stringify(payload))
    this._connection.send(JSON.stringify(payload))
  }

  startHeartBeat = () => {
    console.log('开始心跳')
    this.startHeartBeaTimer = setInterval(() => {
      this.send({
        action: MessageActionType.KEEPALIVE,
        chatMsg: {
          senderId: '1',
          receiverId: '2',
          msg: 'ping',
          msgId: '1'
        },
        extend: '1'
      })
    }, 5000)
  }

  stopHeartBeat = () => {
    console.log('停止心跳')
    clearInterval(this.startHeartBeaTimer)
  }
}

export const ws = new Socket()
