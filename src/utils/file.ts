/** @format */
import { api } from '@/api/api'

function getSuffix(fileName) {
  return fileName.substring(fileName.lastIndexOf('.') + 1)
}

export function uploadFile(uri) {
  console.log('uploadFile', uri)
  let formData = new FormData()
  let file: any = {
    uri: uri, // 图片的 uri，可以是本地路径，也可以是网络地址，也可以是 base64
    type: 'multipart/form-data',
    name: `${makeId()}.${getSuffix(uri)}` // 必须填写，不然会出错
  }
  formData.append('files', file) // key
  return api({
    method: 'post',
    url: 'api/file/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function uploadFiles(files) {
  let formData = new FormData()
  files.forEach((file) => {
    let data: any = {
      uri: file.uri, // 图片的 uri，可以是本地路径，也可以是网络地址，也可以是 base64
      type: 'multipart/form-data',
      name: `${makeId()}.${getSuffix(file.uri)}` // 必须填写，不然会出错
    }
    formData.append('files', data)
  })

  return api({
    method: 'post',
    url: 'api/file/upload',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

function makeId() {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 12; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
