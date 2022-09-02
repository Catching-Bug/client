import boardDatasSlice, { saveBoardDatas } from '../boardDatasSlice'

describe('reducer', () => {
  describe('boardDatas', () => {
    it('change boardDatas', () => {
      const state = boardDatasSlice(
        {
          boardDatas: undefined,
        },
        saveBoardDatas({ boardDatas: 'test' }),
      )

      expect(state.boardDatas).toEqual({ boardDatas: 'test' })
    })
  })
})
