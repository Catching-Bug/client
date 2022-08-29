import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBoardOnce } from '../core/api/board'

export const useBoardData = () => {
  const router = useRouter()

  const [boardDatas, setBoardDatas] = useState<object>({})

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

        setBoardDatas(result?.content)
      }
    }

    checkRouterQuery()
  }, [router.query])

  return { boardDatas }
}
