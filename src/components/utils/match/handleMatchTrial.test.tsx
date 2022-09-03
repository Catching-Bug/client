import * as module from './handleMatchTrial'

jest.mock('./handleMatchTrial', () => ({
  ...jest.requireActual('./handleMatchTrial'),
  __esModule: true,
}))

describe('handleMatchTrial 모듈 테스트', () => {
  const dispatch = jest.fn()

  it('로그인 상태일 때, 매칭 시도가 제대로 되는가?', () => {
    const spyFn = jest.spyOn(module, 'handleMatchTrial')

    module.handleMatchTrial(1, true, dispatch)

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith(1, true, dispatch)
  })

  it('로그인 상태가 아닐 때 로직이 종료되는가', () => {
    const spyFn = jest.spyOn(module, 'handleMatchTrial')
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    module.handleMatchTrial(1, false, dispatch)

    expect(spyFn).toBeCalledTimes(2)
    expect(spyFn).toBeCalledWith(1, false, dispatch)
    expect(alert).toBeCalledTimes(1)
  })
})
