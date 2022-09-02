import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Comment from '../comment'

describe('comment component 테스트', () => {
  const comment = {
    commentedAt: '2022-09-01THH:MM:SS',
    commenterNickname: '작성자',
    content: '내용',
  }

  it('rendering 테스트', () => {
    const { container } = render(<Comment {...comment}></Comment>)

    expect(container).toBeInTheDocument()
  })
})
