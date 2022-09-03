import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Main from '../pages/main'
import { useSelector } from '../__mocks__/react-redux'

jest.mock('react-redux')

describe('main 페이지', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      loginStatusSlice: {
        loginStatus: false,
        loginUserInfo: {
          gender: 'male',
          nickName: '닉네임',
        },
      },
    }),
  )

  it('main render 테스트', () => {
    const { container } = render(<Main />)

    expect(container).toBeInTheDocument()
  })
})
