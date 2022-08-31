import { fireEvent, render, screen } from '@testing-library/react'
import BoardList from '../boardList'

describe('boardList layout 테스트', () => {
  const [title, content, nickName] = ['제목', '내용', '닉네임']
  const onClick = jest.fn().mockImplementation(() => {
    return 'clickEvent'
  })

  it('render 테스트', () => {
    const { container } = render(
      <BoardList
        title={title}
        content={content}
        nickName={nickName}
        onClick={onClick}
      ></BoardList>,
    )

    expect(container).toBeInTheDocument
  })

  it('버튼이 원하는 대로 동작하는가', () => {
    render(
      <BoardList
        title={title}
        content={content}
        nickName={nickName}
        onClick={onClick}
      ></BoardList>,
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(button).toBeInTheDocument
    expect(onClick).toBeCalledTimes(1)

    expect(onClick()).toBe('clickEvent')
  })
})
