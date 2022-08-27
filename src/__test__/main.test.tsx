import { render } from '@testing-library/react'
import Main from '../pages/main'

describe('main 페이지', () => {
  it('main render 테스트', () => {
    const { container } = render(<Main />)

    expect(container).toBeInTheDocument
  })
})
