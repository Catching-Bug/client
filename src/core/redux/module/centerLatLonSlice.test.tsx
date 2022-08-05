import centerLatLonSlice, { saveLatLon } from './centerLatLonSlice'

describe('reducer', () => {
  describe('centerLatLon', () => {
    it('change Lat,Lon', () => {
      const state = centerLatLonSlice(
        {
          latitude: 0,
          longitude: 0,
        },
        saveLatLon({
          latitude: 37.56683096014424,
          longitude: 126.97865225689458,
        }),
      )

      expect(state.latitude).not.toBe(0)
      expect(state.longitude).not.toBe(0)
    })
  })
})
