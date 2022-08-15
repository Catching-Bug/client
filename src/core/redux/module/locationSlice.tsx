import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  location: string
  latitude: number
  longitude: number
}

const initialState: initialType = {
  location: '',
  latitude: 0,
  longitude: 0,
} // 초기 상태 정의

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    saveLocation: (state, action) => {
      state.location = action.payload.location
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
  },
})

export const { saveLocation } = locationSlice.actions // 액션 생성함수
export default locationSlice.reducer // 리듀서
