import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBoardOnce } from '../core/api/board'
import { saveBoardDatas } from '../core/redux/module/boardDatasSlice'
import { RootState } from '../core/redux/module/rootReducer'

export const useBoardData = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { boardDatas } = useSelector(
    (state: RootState) => state.boardDatasSlice,
  )

  const fetchBoardData = async (id: number) => {
    try {
      const result = await getBoardOnce(id)

      return result
    } catch (error) {
      console.log('fetchBoardData 에러')
    }
  }

  useEffect(() => {
    const checkRouterQuery = async () => {
      if (router.query && typeof router.query.id === 'string') {
        const result = await fetchBoardData(Number(router.query.id))

        dispatch(saveBoardDatas(result))
      }
    }

    checkRouterQuery()
  }, [router.query])

  return { boardDatas }
}
