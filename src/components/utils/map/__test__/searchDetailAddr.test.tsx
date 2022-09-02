import * as module from '../searchDetailAddr'

jest.mock('../searchDetailAddr', () => ({
  ...jest.requireActual('../searchDetailAddr'),
  __esModule: true,
}))

describe('searchDetailAddr 모듈 테스트', () => {
  const mouseEvent = {
    getLat: jest.fn(),
    getLng: jest.fn(),
  }
  const dispatch = jest.fn()
  const geocoder = {
    coord2Address: jest.fn(),
  }

  beforeEach(() => {
    const kakao = {
      maps: {
        services: {
          Status: {
            OK: 'OK',
          },
        },
      },
    }

    global.window.kakao = kakao as any
  })

  it('searchDetailAddr를 통해 제대로 하위 함수가 실행되는가?', () => {
    const spyFn = jest.spyOn(module, 'searchDetailAddr')

    module.searchDetailAddr({
      mouseEventLatLng: mouseEvent,
      geocoder,
      dispatch,
    })

    expect(spyFn).toBeCalledTimes(1)
  })

  it('handleDetailLocation가 OK 상태로 넘어갔을 시 제대로 값을 리턴하는가?', () => {
    const result = [
      {
        address: {
          address_name: 'address',
        },
      },
    ]
    const status = 'OK'

    const spyFn = jest.spyOn(module, 'handleDetailLocation')

    const returnData = module.handleDetailLocation(
      result,
      status,
      dispatch,
      mouseEvent,
    )

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith(result, status, dispatch, mouseEvent)
    expect(returnData).toBe('address')
  })
})
