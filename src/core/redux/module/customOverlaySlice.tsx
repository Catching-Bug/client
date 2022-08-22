import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  customOverlay: object[]
  overlayDeleteDetection: boolean
  zoomLevel: number
}

const initialState: initialType = {
  customOverlay: [],
  overlayDeleteDetection: false,
  zoomLevel: 10, // 1, 4, 7, 10을 기준으로 합니다.
} // 초기 상태 정의

const customOverlaySlice = createSlice({
  name: 'customOverlay',
  initialState,
  reducers: {
    saveCustomOverlays: (state, action) => {
      state.customOverlay = action.payload.customOverlay
    },
    changeOverlayDeleteDetection: (state, action) => {
      state.overlayDeleteDetection = action.payload.overlayDeleteDetection
    },
    saveZoomLevel: (state, action) => {
      state.zoomLevel = action.payload.zoomLevel
    },
  },
})

export const {
  saveCustomOverlays,
  changeOverlayDeleteDetection,
  saveZoomLevel,
} = customOverlaySlice.actions // 액션 생성함수
export default customOverlaySlice.reducer // 리듀서
