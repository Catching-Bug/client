import { render } from '@testing-library/react'
import { useRouter } from 'next/router'
import Callback from './callback'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

// 콜백 페이지 테스트
describe('callback page', () => {
  const getAuthorizationCode = jest.fn().mockImplementation(() => 'new code')

  beforeEach(() => {
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      replace: () => {
        ;('/')
      },
    }))
  })

  afterEach(() => {
    getAuthorizationCode.mockClear()
  })

  it('callback Render', () => {
    const { container } = render(<Callback />)

    expect(container).toBeInTheDocument
  })

  it('get Auth Code', () => {
    getAuthorizationCode()

    expect(getAuthorizationCode).toHaveBeenCalled()
    expect(getAuthorizationCode()).toBe('new code')
  })
})
