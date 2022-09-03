import { useEffect, useState } from 'react'
import { commentFetchDataTypes } from '../components/utils/interface/commentFetchDataTypes'
import { commentInViewTypes } from '../components/utils/interface/commentInViewTypes'
import { getComments } from '../core/api/comment'

/**
 * 현재 댓글에 대한 정보를 갱신하는 hook
 * @param boardId 게시글 번호 primary key 값
 * @returns commentsInView, setCommentDetection
 */
export const useCommentInView = (boardId: number) => {
  const [commentsInView, setCommentsInView] = useState<
    commentInViewTypes[] | []
  >([])

  const [commentDetection, setCommentDetection] = useState<boolean>(true)

  const fetchComments = async () => {
    try {
      const result: commentFetchDataTypes = await getComments(boardId)

      handleCommentsInView(result)
    } catch (error) {
      console.log('fetchComments 에러')
    }
  }

  const handleCommentsInView = (result: commentFetchDataTypes) => {
    const comments: commentInViewTypes[] | [] = result.content.content

    setCommentsInView(comments)
  }

  useEffect(() => {
    if (commentDetection) {
      fetchComments()

      setCommentDetection(false)
    }
  }, [commentDetection])

  return { commentsInView, setCommentDetection }
}
