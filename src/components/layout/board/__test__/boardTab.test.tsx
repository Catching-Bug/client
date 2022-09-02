import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import BoardTab from '../boardTab'

describe('boardTab layout 테스트', () => {
  let mode = 'board'
  const setMode = jest.fn().mockImplementation((init) => {
    mode = init
  })

  it('render 테스트', () => {
    const { container } = render(<BoardTab setMode={setMode}></BoardTab>)

    expect(container).toBeInTheDocument()
  })

  it('location 버튼 클릭 시 제대로 mode가 변하는가?', () => {
    render(<BoardTab setMode={setMode}></BoardTab>)

    const locationButton = screen.getByTestId('locationButton')

    expect(locationButton).toBeInTheDocument()

    // location 버튼 클릭
    fireEvent.click(locationButton)

    expect(mode).toBe('location')
    expect(setMode).toBeCalledTimes(1)
  })

  it('match 버튼 클릭 시 제대로 mode가 변하는가?', () => {
    render(<BoardTab setMode={setMode}></BoardTab>)

    const matchButton = screen.getByTestId('matchButton')

    expect(matchButton).toBeInTheDocument()

    // match 버튼 클릭
    fireEvent.click(matchButton)

    expect(mode).toBe('match')
    expect(setMode).toBeCalledTimes(2)
  })

  it('board 버튼 클릭 시 제대로 mode가 변하는가?', () => {
    render(<BoardTab setMode={setMode}></BoardTab>)

    const boardButton = screen.getByTestId('boardButton')

    expect(boardButton).toBeInTheDocument()

    // board 버튼 클릭
    fireEvent.click(boardButton)

    expect(mode).toBe('board')
    expect(setMode).toBeCalledTimes(3)
  })
})
