import modalOpenSlice, { saveModalOpen } from './modalOpenSlice'

describe('reducer', () => {
  describe('modalOpen', () => {
    it('change modalOpen', () => {
      const state = modalOpenSlice(
        {
          modalOpen: false,
        },
        saveModalOpen(true),
      )

      expect(state.modalOpen).not.toBe(true)
    })
  })
})
