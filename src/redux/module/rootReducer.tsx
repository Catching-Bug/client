import { combineReducers } from '@reduxjs/toolkit'

import kakaoMap from './kakaoMap'

const rootReducer = combineReducers({ kakaoMap })

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
