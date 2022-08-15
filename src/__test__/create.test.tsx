import MockAdapter from 'axios-mock-adapter'
import { postCreateBoard } from '../core/api/board'
import { authAxios } from '../core/api/instance/authInstance'
import { defaultAxios } from '../core/api/instance/defaultInstance'
import { getAllLocations, postLocation } from '../core/api/location'
import { postRefreshToken } from '../core/api/user'
import { useSelector } from '../__mocks__/react-redux'

jest.mock('react-redux')

describe('create 페이지 테스트', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      locationSlice: {
        location: '',
        latitude: 0,
        longitude: 0,
      },
    }),
  )

  let defaultMockAdapter: MockAdapter
  let authMockAdapter: MockAdapter

  beforeEach(() => {
    defaultMockAdapter = new MockAdapter(defaultAxios)
    authMockAdapter = new MockAdapter(authAxios)
  })

  afterEach(() => {
    defaultMockAdapter.reset()
    authMockAdapter.reset()
  })

  it('내 초기 위치 정보 받아오는 API called', async () => {
    const code = {
      id: 0,
      latitude: 33,
      longitude: 125,
      region: '서울특별시',
      city: '서울구',
      town: '서울동',
      detailLocation: '서울아파트 103호',
    }

    authMockAdapter.onGet('/api/locations').reply(200, code)

    const result = await getAllLocations()

    expect(authMockAdapter.history.get[0].url).toEqual('/api/locations')
    expect(result).toStrictEqual(code)
  })

  it('새로운 위치 추가하기 API called', async () => {
    const params = {
      latitude: 33,
      longitude: 125,
      region: '서울특별시',
      city: '서울구',
      town: '서울동',
      detailLocation: '서울아파트 103호',
    }

    authMockAdapter.onPost('/api/locations').reply(200, { id: 1 })

    const result = await postLocation(params)

    expect(authMockAdapter.history.post[0].url).toEqual('/api/locations')
    expect(result?.id).toBe(1)
  })

  it('글 생성 요청 API called', async () => {
    const params = {
      title: '제목',
      content: '내용',
      latitude: 33,
      longitude: 125,
    }

    authMockAdapter.onPost('/api/board').reply(200, { id: 1 })

    const result = await postCreateBoard(params)

    expect(authMockAdapter.history.post[0].url).toEqual('/api/board')
    expect(result?.id).toBe(1)
  })

  it('interceptor request 시 refresh Token 재요청 API called', async () => {
    defaultMockAdapter
      .onPost('/api/token/refresh')
      .reply(200, { refreshToken: 'new refresh', accessToken: 'new access' })

    const result = await postRefreshToken()

    expect(defaultMockAdapter.history.post[0].url).toEqual('/api/token/refresh')
    expect(result?.refreshToken).toBe('new refresh')
    expect(result?.accessToken).toBe('new access')
  })
})
