import { fireEvent, render, screen } from '@testing-library/react'
import { useSelector } from '../../../__mocks__/react-redux'
import ModalBottomSheet from './modalBottomSheet'

jest.mock('react-redux')

describe('모달바텀시트 동작 확인', () => {
  // useSelector modalOpen mock
  useSelector.mockImplementation((selector) =>
    selector({
      modalOpenSlice: {
        modalOpen: true,
      },
    }),
  )

  const handleClick = jest.fn()

  it('모달 렌더링과 close가 정상작동 하는가?', () => {
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
