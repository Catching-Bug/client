import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../pages'
import { useSelector } from '../__mocks__/react-redux'

jest.mock('react-redux')

describe('지도 페이지(기본 페이지) 테스트', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      modalOpenSlice: {
        modalOpen: false,
      },
      kakaoMapSlice: {
        map: undefined,
      },
      centerLatLonSlice: {
        latitude: 0,
        longitude: 0,
      },
      markerSlice: {
        marker: undefined,
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

  it('렌더링 테스트', () => {
    //when
    const { container } = render(<Home></Home>)

    //then
    expect(container).toBeInTheDocument()
  })
})
