import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getBoardList } from '../core/api/board'
import { boardTypes } from '../components/utils/interface/boardType'

export const useBoardList = () => {
  const router = useRouter()

  const [townName, setTownName] = useState<string>('')
  const [boardList, setBoardList] = useState<boardTypes[] | []>([])

  useEffect(() => {
    if (router.query && typeof router.query.townName === 'string') {
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
      const result = await getBoardList(townName, 0, 0) // size,page 임시

      setBoardList(result.content.board)
    } catch (error) {
      console.log('handleBoardDatas (useBoardList) 오류')
    }
  }

  return { boardList }
}
