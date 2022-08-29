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
    })

    authMock.onGet('/api/boards').reply(200, {
      content: {
        board: [
          {
            id: 1,
            title: '안녕하세요',
            content: '이거 잡아주실수있나요?',
            nickName: '킹갓제네럴기리보이',
          },
          {
            id: 2,
            title: '여기 대방동인데요',
            content: '바퀴벌레 이따시만한거있어요',
            nickName: '작성자 닉네임2',
          },
          {
            id: 3,
            title: '제목2',
            content: '내용2',
            nickName: '작성자 닉네임2',
          },
          {
            id: 4,
            title: '제목2',
            content: '내용2',
            nickName: '작성자 닉네임2',
          },
          {
            id: 5,
            title: '제목2',
            content: '내용2',
            nickName: '작성자 닉네임2',
          },
          {
            id: 6,
            title: '제목2',
            content: '내용2',
            nickName: '작성자 닉네임2',
          },
          {
            id: 7,
            title: '제목2',
            content: '내용2',
            nickName: '작성자 닉네임2',
          },
          {
            id: 8,
            title: '하이루',
            content:
              '길이ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ11',
            nickName: '작성자 닉네임2',
          },
        ],
      },
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
     * 게시글 조회
     */
    authMock.onGet('/api/board/1').reply(200, {
      content: {
        id: '1',
        region: '서울',
        city: '강남구',
        town: '강남동',
        detailLocation: '강남아파트 101호',
        createdTime: '2022-08-05THH:MM:SS',
        roomTitle: '제목',
        roomContent: '내용',
        creatorNickname: '글쓴이',
        creatorId: '글쓴이 ID',
        latitude: '33',
        longitude: '127',
        status: 'WAITING' /*WAITING , MATCHED*/,

        employ: {
          //게시글이 waiting 상태의 경우 null값
          employId: '15',
          employerId: '1',
          employeeId: '2',
          employeeNickname: '글쓴이',
          employerNickname: '피고용자',
        },
      },
    })

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
