import { useEffect, useState, useCallback } from 'react'
import { flow } from 'lodash'
import { MessageCenterEvent } from '../SocketType'
import { messageCenter } from '../MessageCenter'

export enum ConnectStatus {
  ing,
  success,
  error
}
export function useConnectStatus() {
  const [status, setStatus] = useState(ConnectStatus.success)
  useEffect(() => {
    messageCenter.on(MessageCenterEvent.System.Reconnecting, () => {
      setStatus(ConnectStatus.ing)
    })
    messageCenter.on(MessageCenterEvent.System.Logined, () => {
      setStatus(ConnectStatus.success)
    })
    messageCenter.on(MessageCenterEvent.System.ReconnectFailed, () => {
      setStatus(ConnectStatus.error)
    })
  }, [])

  //   return { status, ConnectStatus, reconnect: messageCenter.connect }
  return { status, ConnectStatus }
}
