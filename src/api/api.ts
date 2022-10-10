/** @format */
import axios from 'axios'
import { getStorageToken } from '../utils/storage'

export let api

const api_url = 'http://192.168.0.178:8080/'
api = axios.create({
  baseURL: api_url
  //headers: {  },
})
api.defaults.timeout = 5000
api.interceptors.request.use(async function (config) {
  console.log('请求链接：', config.url)
  console.log('请求参数：', config.data)
  // console.log('请求：', config)

  let token = await getStorageToken()
  if (token) {
    config.headers.token = token
  }
  return config
})

api.interceptors.response.use(
  function (res) {
    console.log('响应数据：', res.data)
    if (res.data) {
      if (res.data.code === 47000) {
        //if (system.pc) {
        //    appEmitter.fire(appEmitter.type.updateApp, res.data.data);
        //}

        throw new Error(res.data.message)
      }

      if (res.data.code === 47000) {
        throw new Error(res.data.message)
      }
    }

    return res.data
  },
  function (res) {
    console.log('异常消息：', res)
    try {
      let { status, data } = res.response
      if (status === 401) {
        let msg = '登录信息已过期，请重新登录'
        console.log('登录信息已过期，请重新登录')
        //appEmitter.fire(appEmitter.type.logout, msg);
        return Promise.reject(msg)
      }

      if (status >= 500) {
        if (data.code === 40040) {
        }
        return Promise.reject(res)
      }
    } catch (e) {
      return
    }
  }
)
