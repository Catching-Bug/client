import { combineReducers } from '@reduxjs/toolkit'

import kakaoMapSlice from './kakaoMapSlice'
import centerLatLonSlice from './centerLatLonSlice'
import modalOpenSlice from './modalOpenSlice'
import markerSlice from './markerSlice'
import locationSlice from './locationSlice'

const rootReducer = combineReducers({
  kakaoMapSlice,
  centerLatLonSlice,
  modalOpenSlice,
  markerSlice,
  locationSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
