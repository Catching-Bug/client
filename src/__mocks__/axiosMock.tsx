import MockAdapter from 'axios-mock-adapter'
import { authAxios } from '../core/api/instance/authInstance'
import { defaultAxios } from '../core/api/instance/defaultInstance'

/**
 * 위치 관련 요청에 대한 mock adapter
 */
export const mockingCustomOverlay = () => {
  if (typeof window !== 'undefined') {
    const authMock = new MockAdapter(authAxios)
    const defaultMock = new MockAdapter(defaultAxios)

    /**
     * 로그인 요청 조회
     */
    defaultMock
      .onGet('/api/login/oauth', { params: { code: 'code' } })
      .reply(200, {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
        gender: 'male',
        nickName: 'nickname',
      })

    /**
     * 사용자 위치 전부 조회
     */
    authMock.onGet('/api/regions/count').reply(200, {
      content: [
        {
          regionName: '서울시',
          latitude: 37.56268784760272,
          longitude: 126.97469198834557,
          count: 100,
        },
        {
          regionName: '인천시',
          latitude: 37.40532763373784,
          longitude: 126.6509034382647,
          count: 8,
        },
        {
          regionName: '대구시',
          latitude: 35.88204640892123,
          longitude: 128.58549032958936,
          count: 10,
        },
      ],
    })

    authMock.onGet('/api/cities/count').reply(200, {
      content: [
        {
          regionName: '서구',
          latitude: 35.87656663560977,
          longitude: 128.54825534550213,
          count: 127,
        },
        {
          regionName: '북구',
          latitude: 35.93293507215535,
          longitude: 128.58197425421707,
          count: 12,
        },
        {
          regionName: '달서구',
          latitude: 35.82263846478356,
          longitude: 128.52596245734446,
          count: 8,
        },
      ],
    })

    authMock.onGet('/api/towns/count').reply(200, {
      content: [
        {
          regionName: '계대동문',
          latitude: 35.858017749900135,
          longitude: 128.49732723863949,
          count: 127,
        },
        {
          regionName: '와룡',
          latitude: 35.861423236695884,
          longitude: 128.50604835056703,
          count: 8,
        },
        {
          regionName: '계대',
          latitude: 35.85636622364355,
          longitude: 128.48954738009178,
          count: 87,
        },
      ],
    })

    /**
     * 사용자 위치 전부 조회
     */
    authMock.onGet('/api/locations').reply(200, [
      {
        id: 0,
        latitude: 33,
        longitude: 125,
        region: '서울특별시',
        city: '서울구',
        town: '서울동',
        detailLocation: '서울아파트 103호',
      },
    ])

    /**
     * 사용자 위치 등록
     */
    authMock.onPost('/api/locations').reply(200, { id: 1 })

    authMock.onPost('/api/board').reply(200, { id: 2 })

    /**
     * 리프레시 토큰 intercept 요청
     */
    defaultMock
      .onPost('/api/token/refresh')
      .reply(200, { refreshToken: 'new refresh', accessToken: 'new access' })
  }
}
