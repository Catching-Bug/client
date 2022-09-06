import { boardFetchDataTypes } from '../../../utils/interface/boardFetchDataTypes'

export const mockBoardFetchDatas: boardFetchDataTypes = {
  message: 'blah blah',
  content: {
    id: 1,
    region: '서울',
    city: '강남구',
    town: '강남동',
    detailLocation: '강남아파트 101호',
    createdTime: '2022-08-05THH:MM:SS',
    roomTitle: '제목',
    roomContent: '내용',
    creatorNickname: '글쓴이',
    creatorId: 1,
    latitude: 35.812582832534915,
    longitude: 128.51874462784275,
    status: 'WAITING' /*WAITING , MATCHED*/,

    employ: {
      //게시글이 waiting 상태의 경우 null값
      employId: 15,
      employerId: 1,
      employeeId: 2,
      employeeNickname: '글쓴이',
      employerNickname: '피고용자',
    },
  },
}
