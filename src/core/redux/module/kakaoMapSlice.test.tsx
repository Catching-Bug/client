import kakaoMap, { saveMapObject } from './kakaoMapSlice'

describe('reducer', () => {
  describe('kakaoMap', () => {
    it('change map object', () => {
      const state = kakaoMap(
        {
          map: '',
        },
        saveMapObject('mapobj'),
      )

      expect(state.map).not.toHaveLength(0)
    })
  })
})
