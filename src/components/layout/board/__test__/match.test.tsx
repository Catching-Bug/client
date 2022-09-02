import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Match from '../match'

describe('match component 테스트', () => {
  const employInfo = {
    employId: 1,
    employerId: 1,
    employeeId: 2,
    employerNickname: '매칭자',
    employeeNickname: '피매칭자',
  }

  it('WAITING 상태 렌더링이 잘되는가', () => {
    const { container } = render(
      <Match boardId={1} employInfo={employInfo} isMatch={'WAITING'}></Match>,
    )

    expect(container).toBeInTheDocument()
  })
})
