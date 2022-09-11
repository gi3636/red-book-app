import AsyncStorage from '@react-native-async-storage/async-storage'
export const getStorageToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token')
    if (value !== null) {
      return value
    }
  } catch (e: any) {
    console.log('getToken', e.message)
  }
}

export const saveStorageToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (e: any) {
    console.log('saveToken', e.message)
  }
}

export const getStorageUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e: any) {
    console.log('getUser', e.message)
  }
}

export const saveStorageUser = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user))
  } catch (e: any) {
    console.log('saveUser', e.message)
  }
}

export const clearUserStorage = async () => {
  const keys = ['user', 'token']
  try {
    await AsyncStorage.multiRemove(keys)
  } catch (e: any) {
    console.log('clearUserStorage', e.message)
  }
}
