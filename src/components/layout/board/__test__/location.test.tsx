import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { useSelector } from '../../../../__mocks__/react-redux'
import Location from '../location'
import { mockBoardFetchDatas } from './boardFetchDataMock'

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

  mockBoardFetchDatas

  it('rendering 테스트', () => {
    const { container } = render(<Location {...mockBoardFetchDatas}></Location>)

    expect(container).toBeInTheDocument()
  })
})
