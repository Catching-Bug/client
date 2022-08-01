import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  map: any
}

const initialState: initialType = { map: undefined } // 초기 상태 정의

const kakaoMapSlice = createSlice({
  name: 'kakaoMap',
  initialState,
  reducers: {
    saveMapObject: (state, action) => {
      state.map = action.payload
    },
  },
})

export const { saveMapObject } = kakaoMapSlice.actions // 액션 생성함수
export default kakaoMapSlice.reducer // 리듀서
