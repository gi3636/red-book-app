/** @format */
import { api } from './api'

export function add(param) {
  return api.post('api/note/add', param)
}
