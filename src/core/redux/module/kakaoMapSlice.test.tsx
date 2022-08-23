import kakaoMapSlice, { saveMapObject } from './kakaoMapSlice'

describe('reducer', () => {
  describe('kakaoMap', () => {
    it('change map object', () => {
      const state = kakaoMapSlice(
        {
          map: undefined,
          marker: undefined,
          geocoder: undefined,
        },
        saveMapObject({
          map: 'mapobj',
          marker: 'mapobj',
          geocoder: 'geocoder',
        }),
      )

      expect(state.map).not.toBeUndefined()
      expect(state.marker).not.toBeUndefined()
      expect(state.geocoder).not.toBeUndefined()
    })
  })
})
