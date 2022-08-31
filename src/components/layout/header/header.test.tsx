import { fireEvent, render, screen } from '@testing-library/react'
import Header from './header'

describe('헤더 동작 테스트', () => {
  const onClickFn = jest.fn().mockImplementation(() => {
    return 'click'
  })

  it('헤더에 렌더링 되는가?', () => {
    const { container } = render(<Header></Header>)

    expect(container).toBeInTheDocument
  })

  it('헤더에 onClick이 제대로 call 되는가?', () => {
    const { container } = render(<Header onClick={onClickFn}></Header>)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(container).toBeInTheDocument
    expect(button).toBeInTheDocument
    expect(onClickFn).toBeCalledTimes(1)
    expect(onClickFn()).toBe('click')
  })

  it('헤더에 title이 제대로 렌더링 되는가?', () => {
    const { container } = render(<Header title={'testTitle'}></Header>)
    const title = screen.getByText('testTitle')

    expect(container).toBeInTheDocument
    expect(title).toBeInTheDocument
  })
})
