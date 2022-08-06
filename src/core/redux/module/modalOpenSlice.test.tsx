import modalOpen, { saveModalOpen } from './modalOpenSlice'

describe('reducer', () => {
  describe('modalOpen', () => {
    it('change modalOpen', () => {
      const state = modalOpen(
        {
          modalOpen: false,
        },
        saveModalOpen(true),
      )

      expect(state.modalOpen).not.toBe(true)
    })
  })
})
