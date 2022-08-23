import customOverlaySlice, {
  changeCenterLocation,
  changeOverlayDeleteDetection,
  saveCustomOverlays,
} from './customOverlaySlice'

describe('reducer', () => {
  describe('customOverlay', () => {
    it('change customOverlay of object', () => {
      const state = customOverlaySlice(
        {
          customOverlay: [],
          overlayDeleteDetection: false,
          centerLocation: {
            latitude: 0,
            longitude: 0,
          },
        },
        saveCustomOverlays({
          customOverlay: [{ obj: 'obj' }],
        }),
      )

      expect(state.customOverlay).toHaveLength(1)
    })

    it('change overlayDeleteDetection of object', () => {
      const state = customOverlaySlice(
        {
          customOverlay: [],
          overlayDeleteDetection: false,
          centerLocation: {
            latitude: 0,
            longitude: 0,
          },
        },
        changeOverlayDeleteDetection({
          overlayDeleteDetection: true,
        }),
      )

      expect(state.customOverlay).toBeTruthy()
    })

    it('change zoomLevel of object', () => {
      const state = customOverlaySlice(
        {
          customOverlay: [],
          overlayDeleteDetection: false,
          centerLocation: {
            latitude: 0,
            longitude: 0,
          },
        },
        changeCenterLocation({
          centerLocation: {
            latitude: 36,
            longitude: 127,
          },
        }),
      )

      expect(state.centerLocation).toStrictEqual({
        latitude: 36,
        longitude: 127,
      })
    })
  })
})
