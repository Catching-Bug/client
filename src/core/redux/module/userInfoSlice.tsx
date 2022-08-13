import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  nickname: string
  gender: string
  region: string
  city: string
  town: string
  detailLocation: string
}

const initialState: initialType = {
  nickname: '',
  gender: '',
  region: '',
  city: '',
  town: '',
  detailLocation: '',
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    saveBasicsOfUser: (state, action) => {
      state.nickname = action.payload.nickname
      state.gender = action.payload.gender
    },
    saveLocationOfUser: (state, action) => {
      state.region = action.payload.region
      state.city = action.payload.city
      state.town = action.payload.town
      state.detailLocation = action.payload.detailLocation
    },
  },
})

export const { saveBasicsOfUser, saveLocationOfUser } = userInfoSlice.actions
export default userInfoSlice.reducer
