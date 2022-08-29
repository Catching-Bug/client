import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBoard } from '../core/api/board'
import { boardTypes } from '../components/utils/interface/boardType'

export const useBoardList = () => {
  const router = useRouter()

  const [townName, setTownName] = useState<string>('')
  const [boardList, setBoardList] = useState<boardTypes[] | []>([])

  useEffect(() => {
    if (router.query.townName && typeof router.query.townName === 'string') {
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
      // size, page 임시 0으로 처리
      const result = await getBoard(townName, 0, 0)

      setBoardList(result.content.board)
    } catch (error) {
      console.log('handleBoardDatas (useBoardList) 오류')
    }
  }

  return { boardList }
}
