import MockAdapter from 'axios-mock-adapter'
import { authAxios } from '../core/api/instance/authInstance'

/**
 * 위치 관련 요청에 대한 mock adapter
 */
export const mockingCustomOverlay = () => {
  if (typeof window !== 'undefined') {
    const authMock = new MockAdapter(authAxios)

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
  }
}
