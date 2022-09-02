import { createSlice } from '@reduxjs/toolkit'
import { boardFetchDataTypes } from '../../../components/utils/interface/boardFetchDataTypes'

const initialState: { boardDatas: boardFetchDataTypes | undefined } = {
  boardDatas: undefined,
}

const boardDatasSlice = createSlice({
  name: 'boardDatas',
  initialState,
  reducers: {
    saveBoardDatas: (state, action) => {
      state.boardDatas = action.payload
    },
    saveEmployDatas: (state, action) => {
      if (state.boardDatas?.content) {
        state.boardDatas.content.employ = action.payload
      }
    },
    saveIsMatched: (state, action) => {
      if (state.boardDatas?.content?.status) {
        state.boardDatas.content.status = action.payload.isMatched
      }
    },
  },
})

export const { saveBoardDatas, saveEmployDatas, saveIsMatched } =
  boardDatasSlice.actions // 액션 생성함수
export default boardDatasSlice.reducer // 리듀서
