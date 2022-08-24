import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBoard } from '../core/api/board'

export const useBoardList = () => {
  const router = useRouter()

  const [townName, setTownName] = useState<string | string[]>()
  const [boardList, setBoardList] = useState()

  useEffect(() => {
    if (router.query) {
      setTownName(router.query.townName)
    }
  }, [router.query])

  useEffect(() => {
    if (townName) {
      handleBoardDatas()
    }
  }, [townName])

  const handleBoardDatas = async () => {
    try {
      const result = await getBoard()

      setBoardList(result.content.board)
    } catch (error) {
      console.log('handleBoardDatas (useBoardList) 오류')
    }
  }

  return { boardList }
}
