import { combineReducers } from '@reduxjs/toolkit'

import kakaoMap from './kakaoMap'
import centerLatLon from './centerLatLon'

const rootReducer = combineReducers({ kakaoMap, centerLatLon })

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
