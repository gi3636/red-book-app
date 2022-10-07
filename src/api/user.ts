import { api } from './api'
import { getStorageUser } from '../utils/storage'

export async function update(param) {
  let user = await getStorageUser()
  return api.post('api/user/update', { id: user.id, ...param })
}
