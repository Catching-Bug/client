import * as module from '../getMarker'

jest.mock('../getMarker', () => ({
  ...jest.requireActual('../getMarker'),
  __esModule: true,
}))

describe('getMarker 모듈 테스트', () => {
  const mouseEvent = {
    latLng: {
      getLat: jest.fn(),
      getLng: jest.fn(),
    },
  }
  const map = jest.fn()
  const marker = {
    setMap: jest.fn(),
    setPosition: jest.fn(),
  }
  const dispatch = jest.fn()
  const geocoder = {
    coord2Address: jest.fn(),
  }
  const address = true

  it('setClickAction 이 제대로 호출되는가?', () => {
    const spyFn = jest.spyOn(module, 'setClickAction')

    module.setClickAction({
      mouseEvent,
      map,
      marker,
      dispatch,
      geocoder,
      address,
    })

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith({
      mouseEvent,
      map,
      marker,
      dispatch,
      geocoder,
      address,
    })
  })
})
