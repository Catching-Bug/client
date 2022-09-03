import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  loginStatus: boolean
  loginUserInfo:
    | {
        gender: string
        nickName: string
      }
    | undefined
}

const initialState: initialType = {
  loginStatus: false,
  loginUserInfo: undefined,
} // 초기 상태 정의

const loginStatusSlice = createSlice({
  name: 'loginStatus',
  initialState,
  reducers: {
    saveLoginStatus: (state, action) => {
      state.loginStatus = action.payload
    },
    saveLoginUserInfo: (state, action) => {
      state.loginUserInfo = action.payload.loginUserInfo
    },
  },
})

export const { saveLoginStatus, saveLoginUserInfo } = loginStatusSlice.actions // 액션 생성함수
export default loginStatusSlice.reducer // 리듀서
