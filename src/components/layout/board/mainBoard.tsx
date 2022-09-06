import { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { postComment } from '../../../core/api/comment'
import { RootState } from '../../../core/redux/module/rootReducer'
import { useCommentInView } from '../../../hooks/useCommentInView'
import { boardFetchDataTypes } from '../../utils/interface/boardFetchDataTypes'
import { handleNotLoginExecption } from '../../utils/login/handleNotLoginException'

import Button from '../button/button'
import Body from './body'
import Comment from './comment'

let timer: NodeJS.Timeout

const MainBoard = (boardDatas: boardFetchDataTypes) => {
  const { loginStatus } = useSelector(
    (state: RootState) => state.loginStatusSlice,
  )

  // 입력하고있는 comment value
  const [myInputComment, setMyInputComment] = useState<string>('')

  /**
   * onChange Event를 통해 Input 값을 갱신합니다
   * @param event onChange Event
   */
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      setMyInputComment(event.target.value)
    }, 100)
  }

  // comment를 입력하는 input Element Ref
  const commentInputRef = useRef<HTMLInputElement>(null)

  // 현재 fetch해 온 댓글 리스트 및 내가 코멘트를 달았는지 확인하기 위한 SetState
  const { commentsInView, setCommentDetection } = useCommentInView(
    boardDatas.content.id,
  )

  const handleAddComment = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      if (!handleNotLoginExecption(loginStatus)) return

      event.preventDefault()
      const result = await postComment({
        boardId: boardDatas.content.id,
        myInputComment,
      })

      if (commentInputRef.current) commentInputRef.current.value = ''

      setCommentDetection(true)
    } catch (error) {
      console.log('handleAddComment 에러')
    }
  }

  return (
    <>
      <div className="bodyContainer">
        <Body
          title={boardDatas.content.roomTitle}
          content={boardDatas.content.roomContent}
          creatorNickname={boardDatas.content.creatorNickname}
          createTime={boardDatas.content.createdTime}
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
          type={'text'}
          ref={commentInputRef}
          onChange={(event) => {
            handleChangeInput(event)
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
