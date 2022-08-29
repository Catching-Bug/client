import Router from 'next/router'
import { useEffect, useState } from 'react'
import BoardTab from '../../components/layout/board/boardTab'
import Body from '../../components/layout/board/body'
import Comment from '../../components/layout/board/comment'
import Button from '../../components/layout/button/button'
import Header from '../../components/layout/header/header'
import { useBoardData } from '../../hooks/useBoardData'

const Board = () => {
  //board, location, match
  const [tabMode, setTabMode] = useState<string>('board')

  const { boardDatas } = useBoardData()

  return (
    <>
      <div className="boardContainer">
        <Header
          onClick={() => {
            Router.back()
          }}
        ></Header>

        <BoardTab setMode={setTabMode}></BoardTab>

        {(tabMode === 'board' || tabMode === undefined) && (
          <>
            <div className="bodyContainer">
              <Body
                title={'임시제목입니다임시제목입니다임시제목입니다'}
                content={'임시내용'}
                creatorNickname={'익명'}
              ></Body>
            </div>

            <div className="commentContainer">
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
              <Comment></Comment>
            </div>

            <div className="fixedCommentContainer">
              <input className="commentInput"></input>
              <Button>게시</Button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .boardContainer {
          max-width: 1024px;
          width: 100%;
          height: calc((var(--vh, 1vh) * 100));
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #faf9f7;
          position: absolute;
          overflow-y: auto;
        }

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
        }
      `}</style>
    </>
  )
}

export default Board
