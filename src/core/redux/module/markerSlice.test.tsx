import marker, { saveMarker } from './markerSlice'

describe('reducer', () => {
  describe('marker', () => {
    it('change marker object', () => {
      const state = marker(
        {
          marker: undefined,
        },
        saveMarker({ marker: 'changed marker' }),
      )

      expect(state.marker).not.toBeUndefined()
    })
  })
})
