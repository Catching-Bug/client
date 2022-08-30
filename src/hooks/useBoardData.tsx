import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { boardFetchDataTypes } from '../components/utils/interface/boardFetchDataTypes'
import { getBoardOnce } from '../core/api/board'

export const useBoardData = () => {
  const router = useRouter()

  const [boardDatas, setBoardDatas] = useState<
    boardFetchDataTypes | undefined
  >()

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

        setBoardDatas(result)
      }
    }

    checkRouterQuery()
  }, [router.query])

  return { boardDatas }
}
