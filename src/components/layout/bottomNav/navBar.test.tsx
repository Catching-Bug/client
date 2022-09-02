import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import NavBar from './navBar'

describe('navBar test', () => {
  it('navBar가 제대로 렌더링 되는가?', () => {
    //given
    const { container } = render(<NavBar />)

    expect(container).toBeInTheDocument()
  })
})
