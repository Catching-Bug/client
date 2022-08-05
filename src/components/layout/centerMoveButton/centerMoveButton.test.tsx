import { render } from '@testing-library/react'
import { useSelector } from '../../../__mocks__/react-redux'
import CenterMoveButton from './centerMoveButton'

jest.mock('react-redux')

describe('centerMoveButton', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      kakaoMapSlice: {
        map: 'map mock',
      },
      centerLatLonSlice: {
        latitude: 33,
        longitude: 126,
      },
    }),
  )

  it('button render', () => {
    const { container } = render(<CenterMoveButton />)

    expect(container).toBeInTheDocument
  })
})
