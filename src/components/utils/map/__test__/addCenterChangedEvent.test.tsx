import * as addCenterChangedEvent from '../addCenterChangedEvent'

jest.mock('../addCenterChangedEvent', () => ({
  ...jest.requireActual('../addCenterChangedEvent'),
  __esModule: true,
}))

describe('addCenterChangedEvent 기능 테스트', () => {
  const map = jest.fn()
  const geocoder = 'geocoder'
  const dispatch = jest.fn()

  beforeEach(() => {
    const kakao = {
      maps: {
        event: {
          addListener: jest.fn().mockImplementation(() => {
            return 'addListener'
          }),
        },
      },
    }

    global.window.kakao = kakao as any
  })

  it('addCenterChangedEvent가 제대로 콜 되었는가', () => {
    const spyFn = jest.spyOn(addCenterChangedEvent, 'addCenterChangedEvent')

    addCenterChangedEvent.addCenterChangedEvent(map, geocoder, dispatch)

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith(map, geocoder, dispatch)
  })

  it('addCenterChangedEvent가 제대로 콜 되었는가', () => {
    const spyFn = jest.spyOn(addCenterChangedEvent, 'changedActionDebouncing')
    let timer: NodeJS.Timeout | undefined = undefined

    addCenterChangedEvent.changedActionDebouncing(
      map,
      geocoder,
      dispatch,
      timer,
    )

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith(map, geocoder, dispatch, timer)
  })
})
