import * as module from './handleNotLoginException'

jest.mock('./handleNotLoginException', () => ({
  ...jest.requireActual('./handleNotLoginException'),
  __esModule: true,
}))

describe('예외처리 테스트', () => {
  it('login 상태일 때 true를 리턴하는가?', () => {
    const loginStatus = true

    const spyFn = jest.spyOn(module, 'handleNotLoginExecption')

    const result = module.handleNotLoginExecption(loginStatus)

    expect(spyFn).toBeCalledTimes(1)
    expect(spyFn).toBeCalledWith(loginStatus)
    expect(result).toBe(true)
  })

  it('logout 상태일 때 false를 리턴하는가?', () => {
    const loginStatus = false

    const spyFn = jest.spyOn(module, 'handleNotLoginExecption')
    jest.spyOn(window, 'alert').mockImplementation(() => {})

    const result = module.handleNotLoginExecption(loginStatus)

    expect(spyFn).toBeCalledTimes(2)
    expect(spyFn).toBeCalledWith(loginStatus)
    expect(result).toBe(false)
  })
})
