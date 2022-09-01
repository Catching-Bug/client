import { render } from '@testing-library/react'
import MainBoard from '../mainBoard'

describe('mainBoard component 테스트', () => {
  it('render 테스트', () => {
    const { container } = render(<MainBoard boardId={1}></MainBoard>)

    expect(container).toBeInTheDocument
  })
})
