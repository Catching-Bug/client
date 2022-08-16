import { fireEvent, render, screen } from '@testing-library/react'
import Button from './button'

describe('버튼이 원하는 대로 동작할까?', () => {
  const onClickFn = jest.fn().mockImplementation(() => {
    return 'click'
  })

  it('버튼에 옵션이 없을 때도 렌더링 되는가?', () => {
    const { container } = render(<Button></Button>)
    const button = screen.getByRole('button')

    expect(container).toBeInTheDocument
    expect(button).toBeInTheDocument
  })

  it('버튼에 onClick이 제대로 call 되는가?', () => {
    const { container } = render(<Button onClick={onClickFn}></Button>)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(container).toBeInTheDocument
    expect(button).toBeInTheDocument
    expect(onClickFn).toBeCalledTimes(1)
    expect(onClickFn()).toBe('click')
  })
})
