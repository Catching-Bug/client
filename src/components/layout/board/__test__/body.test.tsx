import { render } from '@testing-library/react'
import Body from '../body'

describe('body component 테스트', () => {
  it('rendering 테스트', () => {
    const { container } = render(
      <Body title="제목" content="내용" creatorNickname="작성자"></Body>,
    )

    expect(container).toBeInTheDocument
  })
})
