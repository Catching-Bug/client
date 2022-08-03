import centerLatLon, { saveLatLon } from './centerLatLonSlice'

describe('reducer', () => {
  describe('centerLatLon', () => {
    it('change Lat,Lon', () => {
      const state = centerLatLon(
        {
          Latitude: 0,
          Longitude: 0,
        },
        saveLatLon({
          Latitude: 37.56683096014424,
          Longitude: 126.97865225689458,
        }),
      )

      expect(state.Latitude).not.toBe(0)
      expect(state.Latitude).not.toBe(0)
    })
  })
})
