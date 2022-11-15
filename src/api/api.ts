/*
 * @Author: gi3636 fenggi123@gmail.com
 * @Date: 2022-11-15 22:44:16
 * @LastEditors: gi3636 fenggi123@gmail.com
 * @LastEditTime: 2022-11-16 00:03:03
 * @FilePath: \red-book-app\src\api\api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import { getStorageToken } from '../utils/storage'
import { Alert } from 'react-native'
import Toast from 'react-native-root-toast'

const api_url = 'http://192.168.254.104:8080/'

export let api = axios.create({
  baseURL: api_url
})

api.defaults.timeout = 5000
api.interceptors.request.use(async function (config) {
  console.log('请求链接：', config.url)
  console.log('请求参数：', config.data)

  let token = await getStorageToken()
  if (token) {
    config.headers!.token = token
  }
  return config
})

api.interceptors.response.use(
  function (res) {
    console.log('返回数据：', res.data)

    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.

    if (res.data) {
      if (res.data.code === 47000) {
        throw new Error(res.data.message)
      }

      if (res.data.code === 47000) {
        throw new Error(res.data.message)
      }
    }
    return res.data
  },
  function (res) {
    Toast.show(`异常消息：, ${res}`, {
      duration: Toast.durations.LONG
    })
    try {
      let { status, data } = res.response
      if (status === 401) {
        let msg = '登录信息已过期，请重新登录'
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
