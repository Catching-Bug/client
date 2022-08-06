import { fireEvent, render, screen } from '@testing-library/react'
import { useSelector } from '../../../__mocks__/react-redux'
import ModalBottomSheet from './modalBottomSheet'

jest.mock('react-redux')

describe('modalBottomSheet', () => {
  // useSelector modalOpen mock
  useSelector.mockImplementation((selector) =>
    selector({
      modalOpenSlice: {
        modalOpen: true,
      },
    }),
  )

  const handleClick = jest.fn()

  it('모달 확인', () => {
    //given
    const { container } = render(
      <ModalBottomSheet closeBottomSheet={handleClick} />,
    )

    //when
    fireEvent.click(screen.getByTestId('closeBtn'))

    //then
    expect(container).toBeInTheDocument
    expect(handleClick).toBeCalledTimes(1)
  })
})
