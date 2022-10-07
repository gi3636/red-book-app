import { api } from './api'

export function list(param) {
  return api.post('api/comment/list', {
    size: 10,
    currentPage: 1,
    ...param
  })
}

export function add(param) {
  return api.post('api/comment/add', param)
}
