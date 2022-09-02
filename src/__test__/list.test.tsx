import '@testing-library/jest-dom'
import { useRouter } from 'next/router'
import { render } from '@testing-library/react'
import List from '../pages/board/list/[townName]'
import MockAdapter from 'axios-mock-adapter'
import {
  getCitiesCount,
  getRegionCount,
  getTownsCount,
} from '../core/api/board'
import { authAxios } from '../core/api/instance/authInstance'
import { defaultAxios } from '../core/api/instance/defaultInstance'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('[townName] 페이지 테스트', () => {
  describe('List component 테스트', () => {
    beforeEach(() => {
      ;(useRouter as jest.Mock).mockImplementation(() => ({
        query: {
          townName: 'townName',
        },
      }))
    })

    it('List 컴포넌트 render가 제대로 되는가?', () => {
      const { container } = render(<List></List>)

      expect(container).toBeInTheDocument()
    })
  })

  describe('Board 관련 api 테스트', () => {
    let mockAdapter: MockAdapter
    let defaultAdapter: MockAdapter

    beforeEach(() => {
      mockAdapter = new MockAdapter(authAxios)
      defaultAdapter = new MockAdapter(defaultAxios)

      defaultAdapter
        .onPost('/api/token/refresh')
        .reply(200, { refreshToken: 'new refresh', accessToken: 'new access' })
    })

    afterEach(() => {
      mockAdapter.reset()
    })

    it('Region 단위 요청 api 성공', async () => {
      //given
      const code = {
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
      }

      mockAdapter.onGet('/api/regions/count').reply(200, code)

      //when
      const result = await getRegionCount()

      //then
      expect(mockAdapter.history.get[0].url).toEqual('/api/regions/count')
      expect(result).toEqual(code)
    })

    it('City 단위 요청 api 성공', async () => {
      //given
      const code = {
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
      }

      mockAdapter
        .onGet('/api/cities/count', { params: { regionName: '서울' } })
        .reply(200, code)

      //when
      const result = await getCitiesCount('서울')

      //then
      expect(mockAdapter.history.get[0].url).toEqual('/api/cities/count')
      expect(result).toEqual(code)
    })

    it('Town 단위 요청 api 성공', async () => {
      //given
      const code = {
        content: [
          {
            townName: '계대동문',
            latitude: 35.858017749900135,
            longitude: 128.49732723863949,
            count: 127,
          },
          {
            townName: '와룡',
            latitude: 35.861423236695884,
            longitude: 128.50604835056703,
            count: 8,
          },
          {
            townName: '계대',
            latitude: 35.85636622364355,
            longitude: 128.48954738009178,
            count: 87,
          },
        ],
      }

      mockAdapter
        .onGet('/api/towns/count', { params: { cityName: '남구' } })
        .reply(200, code)

      //when
      const result = await getTownsCount('남구')

      //then
      expect(mockAdapter.history.get[0].url).toEqual('/api/towns/count')
      expect(result).toEqual(code)
    })
  })
})
