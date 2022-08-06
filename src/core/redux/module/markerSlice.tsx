import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  marker: any
}

const initialState: initialType = {
  marker: null,
} // 초기 상태 정의

const markerSlice = createSlice({
  name: 'marker',
  initialState,
  reducers: {
    saveMarker: (state, action) => {
      state.marker = action.payload.marker
    },
  },
})

export const { saveMarker } = markerSlice.actions // 액션 생성함수
export default markerSlice.reducer // 리듀서
