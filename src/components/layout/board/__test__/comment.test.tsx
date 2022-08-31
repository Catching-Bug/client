import { render } from '@testing-library/react'
import Comment from '../comment'

describe('comment component 테스트', () => {
  it('rendering 테스트', () => {
    const { container } = render(<Comment></Comment>)

    expect(container).toBeInTheDocument
  })
})
