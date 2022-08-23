import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  customOverlay: object[]
  overlayDeleteDetection: boolean
  centerLocation: {
    latitude: number
    longitude: number
  }
}

const initialState: initialType = {
  customOverlay: [],
  overlayDeleteDetection: false,
  centerLocation: {
    latitude: 0,
    longitude: 0,
  },
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
    changeCenterLocation: (state, action) => {
      state.centerLocation = action.payload.centerLocation
    },
  },
})

export const {
  saveCustomOverlays,
  changeOverlayDeleteDetection,
  changeCenterLocation,
} = customOverlaySlice.actions // 액션 생성함수
export default customOverlaySlice.reducer // 리듀서
