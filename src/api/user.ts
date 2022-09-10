import { api } from './api'
import { getStorageUser } from '../utils/storage'
import { useToast } from 'native-base'

export async function update(param) {
  let user = await getStorageUser()
  return api.post('api/user/update', { id: user.id, ...param })
}
