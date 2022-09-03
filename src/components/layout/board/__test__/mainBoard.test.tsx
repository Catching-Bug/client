import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useSelector } from '../../../../__mocks__/react-redux'
import MainBoard from '../mainBoard'

jest.mock('react-redux')

// import * as customHook from '../../../../hooks/useCommentInView'

// jest.mock('../../../../hooks/useCommentInView', () => ({
//   ...jest.requireActual('../../../../hooks/useCommentInView'),
//   useCommentInView: jest.fn().mockImplementation(() => {
//     return {
//       commentsInView: [
//         {
//           commentId: 1,
//           commentedAt: 'At',
//           commenterNickname: '닉네임',
//           content: '내용',
//         },
//         {
//           commentId: 2,
//           commentedAt: 'At2',
//           commenterNickname: '닉네임2',
//           content: '내용2',
//         },
//       ],
//       setCommentDetection: jest.fn(),
//     }
//   }),
// }))

describe('mainBoard component 테스트', () => {
  useSelector.mockImplementation((selector) =>
    selector({
      loginStatusSlice: {
        loginStatus: true,
      },
    }),
  )

  it('render 테스트', () => {
    // customHook.useCommentInView(1)

    const { container } = render(<MainBoard boardId={1}></MainBoard>)

    expect(container).toBeInTheDocument()
  })

  it('input onchange 테스트', () => {
    const { container } = render(<MainBoard boardId={1}></MainBoard>)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'changed' } })

    expect(container).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('changed')
  })

  it('button click 테스트', () => {
    const { container } = render(<MainBoard boardId={1}></MainBoard>)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(container).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
