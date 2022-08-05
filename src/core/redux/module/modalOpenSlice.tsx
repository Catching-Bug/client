import { createSlice } from '@reduxjs/toolkit'

interface initialType {
  modalOpen: boolean
}

const initialState: initialType = {
  modalOpen: false,
} // 초기 상태 정의

const modalOpenSlice = createSlice({
  name: 'modalOpen',
  initialState,
  reducers: {
    saveModalOpen: (state, action) => {
      state.modalOpen = action.payload.modalOpen
    },
  },
})

export const { saveModalOpen } = modalOpenSlice.actions // 액션 생성함수
export default modalOpenSlice.reducer // 리듀서
