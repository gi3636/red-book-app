/** @format */
import { api } from './api'

export function add(param) {
  return api.post('api/note/add', param)
}

export function list(param) {
  return api.post('api/note/list', {
    size: 10,
    currentPage: 1,
    isPublic: true,
    ...param
  })
}
