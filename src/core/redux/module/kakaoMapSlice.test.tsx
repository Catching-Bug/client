import kakaoMapSlice, { saveMapObject } from './kakaoMapSlice'

describe('reducer', () => {
  describe('kakaoMap', () => {
    it('change map object', () => {
      const state = kakaoMapSlice(
        {
          map: undefined,
        },
        saveMapObject({ map: 'mapobj' }),
      )

      expect(state.map).not.toBeUndefined()
    })
  })
})
