/** @format */

import { createSlice } from '@reduxjs/toolkit'
import { clearUserStorage, saveStorageUser } from '../../utils/storage'

export interface UserState {}

const initialState: UserState = {}
const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      let data = action.payload
      let newData = { ...state, ...data }
      saveStorageUser(newData)
      return newData
    },
    userLogout: (state) => {
      clearUserStorage()
      return initialState
    }
  }
})
export const { updateUser, userLogout } = UserSlice.actions
export default UserSlice.reducer
