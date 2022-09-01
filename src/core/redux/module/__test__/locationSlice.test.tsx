import locationSlice, { saveLocation } from '../locationSlice'

describe('reducer', () => {
  describe('locationSlice', () => {
    it('change location object', () => {
      const state = locationSlice(
        {
          location: '',
          latitude: 0,
          longitude: 0,
        },
        saveLocation({
          location: '서울특별시 서울동 서울구',
          latitude: 33,
          longitude: 125,
        }),
      )

      expect(state.location).not.toHaveLength(0)
      expect(state.latitude).toBe(33)
      expect(state.longitude).toBe(125)
    })
  })
})
