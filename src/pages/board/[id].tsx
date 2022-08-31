import Router from 'next/router'
import { useState } from 'react'
import BoardTab from '../../components/layout/board/boardTab'
import Body from '../../components/layout/board/body'
import Comment from '../../components/layout/board/comment'
import Location from '../../components/layout/board/location'
import MainBoard from '../../components/layout/board/mainBoard'
import Match from '../../components/layout/board/match'
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

        {(tabMode === 'board' || tabMode === undefined) &&
          boardDatas?.content && (
            <MainBoard boardId={Number(boardDatas.content.id)} />
          )}

        {tabMode === 'location' && boardDatas?.content && (
          <Location {...boardDatas}></Location>
        )}

        {tabMode === 'match' && <Match />}
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
      `}</style>
    </>
  )
}

export default Board
