import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  Latitude: number
  Longitude: number
}

const initialState: initialType = {
  Latitude: 37.56683096014424,
  Longitude: 126.97865225689458,
} // 초기 상태 정의

const centerLatLonSlice = createSlice({
  name: 'centerLatLon',
  initialState,
  reducers: {
    saveLatLon: (state, action) => {
      state.Latitude = action.payload.Latitude
      state.Longitude = action.payload.Longitude
    },
  },
})

export const { saveLatLon } = centerLatLonSlice.actions // 액션 생성함수
export default centerLatLonSlice.reducer // 리듀서
