import { combineReducers } from '@reduxjs/toolkit'

import kakaoMapSlice from './kakaoMapSlice'
import centerLatLonSlice from './centerLatLonSlice'
import modalOpenSlice from './modalOpenSlice'
import markerSlice from './markerSlice'

const rootReducer = combineReducers({
  kakaoMapSlice,
  centerLatLonSlice,
  modalOpenSlice,
  markerSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
