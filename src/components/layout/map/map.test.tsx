import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { useSelector } from '../../../__mocks__/react-redux'

import Map from './map'

jest.mock('react-redux')

describe('map 페이지', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      kakaoMapSlice: {
        map: {
          setCenter: jest.fn(),
          getCenter: jest.fn(),
        },
        marker: {
          setMap: jest.fn(),
        },
        geocoder: {
          coord2Address: jest.fn(),
        },
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

  const LatLng = jest.fn()
  const addListener = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    const kakao = {
      maps: {
        LatLng,
        event: {
          addListener,
        },
      },
    }

    global.window.kakao = kakao as any
  })

  it('map 옵션 없이 render 테스트', () => {
    const { container } = render(<Map></Map>)

    expect(container).toBeInTheDocument()
  })

  it('map 옵션 있을 때 테스트', () => {
    const { container } = render(
      <Map showMyLocation getAroundUserBoard address enableToGetMarker></Map>,
    )

    expect(container).toBeInTheDocument()
  })
})
