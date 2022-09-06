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
    defaultMock.onGet('/api/login/oauth').reply(200, {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      gender: 'male',
      nickName: '벌레가무서워',
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
          count: 2,
        },
      ],
    })

    authMock.onGet('/api/boards').reply(200, {
      content: {
        board: [
          {
            id: 1,
            title: '바퀴벌레 나왔어요',
            content: '이거 잡아주실수있나요?',
            nickName: '모기가무서워',
          },
          {
            id: 2,
            title: '벌레가 너무 무서워요',
            content: '잡아주실분',
            nickName: '벌레무서워',
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
      message: 'blah blah',
      content: {
        id: 1,
        region: '대구',
        city: '서구',
        town: '계대동',
        detailLocation: '계대빌라 201호',
        createdTime: '10분 전',
        roomTitle: '바퀴벌레 나왔어요',
        roomContent: '이거 잡아주실수있나요?',
        creatorNickname: '모기가무서워',
        creatorId: 1,
        latitude: 35.812582832534915,
        longitude: 128.51874462784275,
        status: 'WAITING' /*WAITING , MATCHED*/,

        employ: {
          //게시글이 waiting 상태의 경우 null값
          employId: 15,
          employerId: 1,
          employeeId: 2,
          employeeNickname: '모기가무서워',
          employerNickname: '벌레왕',
        },
      },
    })

    authMock.onGet('/api/comments/1').reply(200, {
      message: '정상적으로 댓글을 조회했습니다.',
      content: {
        content: [
          {
            commentId: 1,
            content: '제가 잡아드릴게요',
            commenterNickname: '벌레왕',
            commentedAt: '09-06 12:30',
          },
        ],
        pageable: {
          sort: {
            sorted: false,
            unsorted: true,
            empty: true,
          },
          pageNumber: 0,
          pageSize: 20,
          offset: 0,
          paged: true,
          unpaged: false,
        },
        totalPages: 0,
        totalElements: 0,
        last: true,
        numberOfElements: 0,
        sort: {
          sorted: false,
          unsorted: true,
          empty: true,
        },
        size: 20,
        number: 0,
        first: true,
        empty: true,
      },
    })

    /**
     *
     */
    authMock.onPost('/api/comment/1').reply(200, {
      message: '댓글이 정상적으로 등록되었습니다.',
      content: {
        commentId: 1,
        commentAt: '2022-09-01T12:12:12',
        commenterNickname: '임시댓글자',
        content: '댓글1입니다.',
      },
    })

    authMock.onPost('/api/employ/1').reply(200, {
      message: '',
      content: {
        employ: {
          employId: 1,
          employerId: 1,
          employeeId: 2,
          employeeNickname: '벌레가무서워',
          employerNickname: '벌레왕',
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
