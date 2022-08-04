import { fireEvent, render } from '@testing-library/react'
import { useSelector } from '../../../__mocks__/react-redux'
import CenterMoveButton from './centerMoveButton'

jest.mock('react-redux')

describe('centerMoveButton', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      kakaoMapSlice: {
        map: 'm',
      },
      centerLatLonSlice: {
        latitude: 33,
        longitude: 126,
      },
    }),
  )

  const handleMoveToCenter = jest.fn()

  it('call handleMoveButton', () => {
    const { container, getAllByText } = render(<CenterMoveButton />)

    expect(container).toHaveTextContent

    const button = getAllByText('이동')
    fireEvent.click(button[0])
    expect(handleMoveToCenter).toBeCalled()
  })
})
