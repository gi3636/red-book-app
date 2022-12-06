/*
 * @Author: franky franky.b@iscmango.com
 * @Date: 2022-10-18 14:10:17
 * @LastEditors: franky franky.b@iscmango.com
 * @LastEditTime: 2022-11-17 16:47:46
 * @FilePath: /red-book-app/src/utils/app.emitter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @format */

import { Emmiter } from './E'

enum AppEmitterType {
  loading,
  editData,
  focusCommentInput,
  addNoteComment,
  updateCommentData,
  refreshPreviewCard,
  loadData,
  popUpToolBox,
  withdrawToolBox
}

class AppEmmiter extends Emmiter {
  type = AppEmitterType
}

export const appEmitter = new AppEmmiter()
