import { combineReducers } from '@reduxjs/toolkit'

import kakaoMapSlice from './kakaoMapSlice'
import centerLatLonSlice from './centerLatLonSlice'
import modalOpenSlice from './modalOpenSlice'
import markerSlice from './markerSlice'
import locationSlice from './locationSlice'
import customOverlaySlice from './customOverlaySlice'
import boardDatasSlice from './boardDatasSlice'
import loginStatusSlice from './loginStatusSlice'

const rootReducer = combineReducers({
  kakaoMapSlice,
  centerLatLonSlice,
  modalOpenSlice,
  markerSlice,
  locationSlice,
  customOverlaySlice,
  boardDatasSlice,
  loginStatusSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
