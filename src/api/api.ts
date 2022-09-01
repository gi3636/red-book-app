/** @format */
import axios from 'axios'

export let api

const api_url = 'http:localhost:8080/'
api = axios.create({
  baseURL: api_url
  //headers: {  },
})
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) config.headers.token = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  function (res) {
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
