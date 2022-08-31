import { useRouter } from 'next/router'
import MockAdapter from 'axios-mock-adapter'
import { defaultAxios } from '../core/api/instance/defaultInstance'
import { getAuthLogin } from '../core/api/user'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

/* 대제목 */
describe('callback', () => {
  describe('getAuth Function 테스트', () => {
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

    it('AuthCode가 제대로 실행되는지, 값은 제대로 받아오는지', () => {
      //when
      getAuthorizationCode()

      //then
      expect(getAuthorizationCode).toHaveBeenCalled()
      expect(getAuthorizationCode()).toBe('new code')
    })
  })

  describe('API 호출 테스트', () => {
    let mockAdapter: MockAdapter

    beforeEach(() => {
      mockAdapter = new MockAdapter(defaultAxios)
    })

    afterEach(() => {
      mockAdapter.reset()
    })

    it('성공 케이스 => authcode가 제대로 확인됐는지, url은 맞는지', async () => {
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

    it('실패 케이스 => 네트워크 에러로 result가 undefined로 호출되는지', async () => {
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
