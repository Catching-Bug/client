import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { useSelector } from '../../../../__mocks__/react-redux'
import { boardFetchDataTypes } from '../../../utils/interface/boardFetchDataTypes'
import Location from '../location'

jest.mock('react-redux')

describe('location component 테스트', () => {
  const setCenter = jest.fn()
  const LatLng = jest.fn()
  const setMap = jest.fn()

  useSelector.mockImplementation((selector) =>
    selector({
      kakaoMapSlice: {
        map: {
          setCenter,
        },
        marker: 'marker',
        geocoder: 'geocoder',
      },
      customOverlaySlice: {
        customOverlay: [],
        overlayDeleteDetection: false,
        centerLocation: {
          latitude: 0,
          longitude: 0,
        },
      },
    }),
  )

  beforeEach(() => {
    const kakao = {
      maps: {
        LatLng,
        Marker: jest.fn().mockReturnValue({ setMap }),
      },
    }

    global.window.kakao = kakao as any
  })

  const mockBoardFetchDatas: boardFetchDataTypes = {
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

  it('rendering 테스트', () => {
    const { container } = render(<Location {...mockBoardFetchDatas}></Location>)

    expect(container).toBeInTheDocument()
  })
})
