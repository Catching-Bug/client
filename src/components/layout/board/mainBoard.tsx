import { MouseEvent, useEffect, useState } from 'react'
import { getComments, postComment } from '../../../core/api/comment'
import { commentFetchDataTypes } from '../../utils/interface/commentFetchDataTypes'
import { commentInViewTypes } from '../../utils/interface/commentInViewTypes'

import Button from '../button/button'
import Body from './body'
import Comment from './comment'

let timer: NodeJS.Timeout

const MainBoard = ({ boardId }: { boardId: number }) => {
  const [myInputComment, setMyInputComment] = useState<string>('')

  const handleChangeInput = (value: string) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      setMyInputComment(value)
    }, 100)
  }

  const handleAddComment = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault()
      const result = await postComment({ boardId, myInputComment })

      setCommentDetection(true)
    } catch (error) {
      console.log('handleAddComment 에러')
    }
  }

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

  return (
    <>
      <div className="bodyContainer">
        <Body
          title={'임시제목입니다임시제목입니다임시제목입니다'}
          content={'임시내용'}
          creatorNickname={'익명'}
        ></Body>
      </div>

      <div className="commentContainer">
        {commentsInView.length &&
          commentsInView.map((comment) => {
            return <Comment key={comment.commentId} {...comment}></Comment>
          })}
      </div>

      <div className="fixedCommentContainer">
        <input
          className="commentInput"
          onChange={(event) => {
            handleChangeInput(event.target.value)
          }}
        ></input>

        <Button
          onClick={(event) => {
            handleAddComment(event)
          }}
        >
          게시
        </Button>
      </div>

      <style jsx>{`
        .bodyContainer {
          margin-bottom: 10px;
          width: 98%;
          /* height: calc(var(--vh, 1vh) * 100); */
          background-color: white;
          border-left: 1px solid blue;
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          padding: 0 10px;
        }

        .commentContainer {
          width: 98%;
          border-top: 1px rgb(0, 0, 0, 1);
          box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
          background-color: white;
          border-left: 1px solid lightcoral;
          margin-bottom: 50px;
        }

        .fixedCommentContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          bottom: 0;
          width: 100%;
          max-width: 1024px;
          height: 50px;
          background-color: white;
          box-shadow: 0 0 2px 0 rgb(0, 0, 0, 0.5);
        }

        .commentInput {
          width: 80%;
          height: 30px;
          padding: 0 10px;
          border-radius: 8px;
          border: 1px solid rgb(0, 0, 0, 0.5);
          background-color: white;
        }
      `}</style>
    </>
  )
}

export default MainBoard
