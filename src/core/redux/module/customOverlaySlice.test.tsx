import customOverlaySlice, {
  changeOverlayDeleteDetection,
  saveCustomOverlays,
  saveZoomLevel,
} from './customOverlaySlice'

describe('reducer', () => {
  describe('customOverlay', () => {
    it('change customOverlay of object', () => {
      const state = customOverlaySlice(
        {
          customOverlay: [],
          overlayDeleteDetection: false,
          zoomLevel: 4,
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
          zoomLevel: 4,
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
          zoomLevel: 4,
        },
        saveZoomLevel({
          zoomLevel: 7,
        }),
      )

      expect(state.zoomLevel).toBe(7)
    })
  })
})
