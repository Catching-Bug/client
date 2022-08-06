import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  latitude: number
  longitude: number
}

const initialState: initialType = {
  latitude: 37.56683096014424,
  longitude: 126.97865225689458,
} // 초기 상태 정의

const centerLatLonSlice = createSlice({
  name: 'centerLatLon',
  initialState,
  reducers: {
    saveLatLon: (state, action) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
  },
})

export const { saveLatLon } = centerLatLonSlice.actions // 액션 생성함수
export default centerLatLonSlice.reducer // 리듀서
