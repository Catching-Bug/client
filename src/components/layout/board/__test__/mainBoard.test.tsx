import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { useSelector } from '../../../../__mocks__/react-redux'
import MainBoard from '../mainBoard'
import { mockBoardFetchDatas } from './boardFetchDataMock'

jest.mock('react-redux')

describe('mainBoard component 테스트', () => {
  mockBoardFetchDatas

  useSelector.mockImplementation((selector) =>
    selector({
      loginStatusSlice: {
        loginStatus: true,
      },
    }),
  )

  it('render 테스트', () => {
    const { container } = render(
      <MainBoard {...mockBoardFetchDatas}></MainBoard>,
    )

    expect(container).toBeInTheDocument()
  })

  it('input onchange 테스트', () => {
    const { container } = render(
      <MainBoard {...mockBoardFetchDatas}></MainBoard>,
    )

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'changed' } })

    expect(container).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('changed')
  })

  it('button click 테스트', () => {
    const { container } = render(
      <MainBoard {...mockBoardFetchDatas}></MainBoard>,
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(container).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
})
