import markerSlice, { saveMarker } from './markerSlice'

describe('reducer', () => {
  describe('marker', () => {
    it('change marker object', () => {
      const state = markerSlice(
        {
          marker: undefined,
        },
        saveMarker({ marker: 'changed marker' }),
      )

      expect(state.marker).not.toBeUndefined()
    })
  })
})
