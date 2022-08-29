import { render } from '@testing-library/react'
import Board from './board'

describe('board 페이지', () => {
  it('board render 테스트', () => {
    //when
    const { container } = render(
      <Board id={1} title={'제목'} content={'내용'} nickName={'닉네임'} />,
    )

    expect(container).toBeInTheDocument
  })
})
