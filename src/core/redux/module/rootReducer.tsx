import { combineReducers } from '@reduxjs/toolkit'

import kakaoMapSlice from './kakaoMapSlice'
import centerLatLonSlice from './centerLatLonSlice'

const rootReducer = combineReducers({ kakaoMapSlice, centerLatLonSlice })

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
