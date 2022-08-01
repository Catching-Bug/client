import { render, screen } from '@testing-library/react'
import Map from './map'

describe('Map 렌더링 테스트', () => {
  it('should render Map', () => {
    render(<Map />)

    const map = screen.getByText('kakaoMap')

    expect(map).toBeInTheDocument
  })
})
