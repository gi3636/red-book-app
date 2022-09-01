/** @format */
import { api } from './api'

export function getStsToken() {
  return api.get('/api/sts/token')
}
