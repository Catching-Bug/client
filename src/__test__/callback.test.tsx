import { useRouter } from 'next/router'
import MockAdapter from 'axios-mock-adapter'
import { defaultAxios } from '../core/api/instance/defaultInstance'
import { getAuthLogin } from '../core/api/user'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// 콜백 페이지 테스트
describe('callback page', () => {
  describe('getAuth function test', () => {
    //given
    const getAuthorizationCode = jest.fn().mockImplementation(() => 'new code')

    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        replace: () => {
          ;('/')
        },
      }))
    })

    afterEach(() => {
      getAuthorizationCode.mockClear()
    })

    it('get Auth Code', () => {
      getAuthorizationCode()

      expect(getAuthorizationCode).toHaveBeenCalled()
      expect(getAuthorizationCode()).toBe('new code')
    })
  })

  describe('when API call', () => {
    let mockAdapter: MockAdapter

    beforeEach(() => {
      mockAdapter = new MockAdapter(defaultAxios)
    })

    afterEach(() => {
      mockAdapter.reset()
    })

    it('success case, need return tokens', async () => {
      //given
      const code = {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        gender: 'male',
        nickName: 'nickname',
      }

      mockAdapter
        .onGet('/api/login/oauth', { params: { code: 'authCode' } })
        .reply(200, code)

      //when
      const result = await getAuthLogin({ code: 'authCode' })

      //then
      expect(mockAdapter.history.get[0].url).toEqual('/api/login/oauth')
      expect(result).toEqual(code)
    })

    it('fail case, return no datas', async () => {
      //given
      mockAdapter
        .onGet('/api/login/oauth', { params: { code: 'authCode' } })
        .networkErrorOnce()

      //when
      const result = await getAuthLogin({ code: 'authCode' })

      //then
      expect(mockAdapter.history.get[0].url).toEqual('/api/login/oauth')
      expect(result).toEqual(undefined)
    })
  })
})
