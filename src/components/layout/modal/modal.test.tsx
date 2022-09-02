import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Modal from './modal'

describe('modal 페이지', () => {
  let modalOpen: boolean
  const toggleModalOpenStatus = jest.fn().mockImplementation(() => {
    modalOpen = !modalOpen
  })

  it('modal render 이 제대로 되는지', () => {
    //given
    modalOpen = false

    //when
    const { container } = render(
      <Modal
        modalOpen={modalOpen}
        toggleModalOpenStatus={toggleModalOpenStatus}
      />,
    )

    //then
    expect(container).toBeInTheDocument()
    expect(modalOpen).toBe(false)
  })

  it('toggle 기능이 정상 작동하는지', () => {
    //given
    modalOpen = false

    //when
    toggleModalOpenStatus()

    render(
      <Modal
        modalOpen={modalOpen}
        toggleModalOpenStatus={toggleModalOpenStatus}
      />,
    )

    const modalBackgroundDiv = screen.getByTestId('modalBackground')

    //then
    expect(modalBackgroundDiv).toBeInTheDocument()
    expect(toggleModalOpenStatus).toBeCalledTimes(1)
    expect(modalOpen).toBe(true)
  })

  it('background 클릭에도 toggle이 작동하여 false로 변경이 되는지', () => {
    //given
    modalOpen = true

    //when
    render(
      <Modal
        modalOpen={modalOpen}
        toggleModalOpenStatus={toggleModalOpenStatus}
        backgroundToggle={true}
      />,
    )

    const modalBackgroundDiv = screen.getByTestId('modalBackground')

    fireEvent.click(modalBackgroundDiv)

    //then
    expect(modalBackgroundDiv).toBeInTheDocument()
    expect(modalOpen).toBe(false)
  })
})
