/** @format */

import { Emmiter } from './E'

enum AppEmitterType {
  voiceStop,
  videoPlay,
  login,
  logout,
  groupNoticeChange,
  showConvDetail,
  editorMention,
  editorSend,
  suggEvent,
  transmitMsg,
  groupLock,
  previewImg,
  editorBottom,
  Introduction,
  friendReq,
  stickerCollect,
  updateExpressionList,
  showNoticeModal,
  detailRoute,
  paymentUpdate,
  moveToFindMsg,
  refreshGetLocalMsg,
  newSystemNotice,
  appendLocalMsg,
  updateApp,
  UserStatus
}

class AppEmmiter extends Emmiter {
  type = AppEmitterType
}

export const appEmitter = new AppEmmiter()
