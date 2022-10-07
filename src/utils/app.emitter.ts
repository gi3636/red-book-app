/** @format */

import { Emmiter } from './E'

enum AppEmitterType {
  loading,
  editData,
  openDrawer,
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
  UserStatus,
  focusCommentInput,
  addNoteComment
}

class AppEmmiter extends Emmiter {
  type = AppEmitterType
}

export const appEmitter = new AppEmmiter()
