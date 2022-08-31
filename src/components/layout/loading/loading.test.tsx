import { render } from '@testing-library/react'
import Loading from './loading'

describe('loading 페이지', () => {
  it('loading 페이지 렌더가 잘 되는지', () => {
    const { container } = render(<Loading />)

    expect(container).toBeInTheDocument
  })
})
