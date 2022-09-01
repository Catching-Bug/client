import { getRegionCount } from '../../../../core/api/board'
import * as module from '../handleCustomOverlay'

jest.mock('../handleCustomOverlay', () => ({
  ...jest.requireActual('../handleCustomOverlay'),
  __esModule: true,
}))

describe('handleCustomOverlay 모듈 테스트', () => {
  let zoomLevel: number
  const map = {
    getLevel: jest.fn(),
    setLevel: jest.fn(),
  }
  const dispatch = jest.fn()
  const detailLocation = '서울시 서울구 서울동 서울아파트 101호'

  const spyFn = jest.spyOn(module, 'handleCustomOverlay')

  describe('handleCustomOverlay Function Test', () => {
    it('zoomLevel 10 이상(도시 단위) 테스트', () => {
      zoomLevel = 10

      const result = module.handleCustomOverlay(
        zoomLevel,
        map,
        dispatch,
        detailLocation,
      )

      expect(spyFn).toBeCalledTimes(1)
      expect(spyFn).toBeCalledWith(zoomLevel, map, dispatch, detailLocation)
      expect(result).toBeUndefined()
    })

    it('zoomLevel 7 이상(구 단위) 테스트', () => {
      zoomLevel = 7

      const result = module.handleCustomOverlay(
        zoomLevel,
        map,
        dispatch,
        detailLocation,
      )

      expect(spyFn).toBeCalledTimes(2)
      expect(spyFn).toBeCalledWith(zoomLevel, map, dispatch, detailLocation)
      expect(result).toBeUndefined()
    })

    it('이 외 하위 구간 테스트', () => {
      zoomLevel = 5

      const result = module.handleCustomOverlay(
        zoomLevel,
        map,
        dispatch,
        detailLocation,
      )

      expect(spyFn).toBeCalledTimes(3)
      expect(spyFn).toBeCalledWith(zoomLevel, map, dispatch, detailLocation)
      expect(result).toBeUndefined()
    })
  })

  describe('drawCustomOverlays Function Test', () => {
    const spyFn = jest.spyOn(module, 'drawCustomOverlays')

    it('기능에 오류는 없는지, 호출은 잘 되는지, 인자는 맞는지 테스트', () => {
      module.drawCustomOverlays(getRegionCount(), dispatch, map, true)

      expect(spyFn).toBeCalledTimes(1)
      expect(spyFn).toBeCalledWith(getRegionCount(), dispatch, map, true)
    })
  })

  describe('handleFetchData Function Test', () => {
    const spyFn = jest.spyOn(module, 'handleFetchData')
    const LatLng = jest.fn()
    const CustomOverlay = jest.fn().mockImplementation(() => ({
      setMap: jest.fn(),
    }))

    beforeEach(() => {
      const kakao = {
        maps: {
          LatLng,
          CustomOverlay,
        },
      }

      global.window.kakao = kakao as any
    })

    it('기능에 오류는 없는지, 호출은 잘 되는지, 인자는 맞는지 테스트', () => {
      const mockFetchResult = {
        message: '메세지',
        content: [
          {
            regionName: '서울시',
            cityName: '서울구',
            townName: '서울동',
            latitude: 33,
            longitude: 127,
            count: 100,
          },
        ],
      }

      module.handleFetchData(mockFetchResult, dispatch, map, true)

      expect(spyFn).toBeCalledTimes(1)
      expect(spyFn).toBeCalledWith(mockFetchResult, dispatch, map, true)
    })
  })
})
