import { combineReducers } from '@reduxjs/toolkit'

import kakaoMapSlice from './kakaoMapSlice'
import centerLatLonSlice from './centerLatLonSlice'
import modalOpenSlice from './modalOpenSlice'

const rootReducer = combineReducers({
  kakaoMapSlice,
  centerLatLonSlice,
  modalOpenSlice,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
