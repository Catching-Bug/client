import Router from 'next/router'
import { useState } from 'react'
import BoardTab from '../../components/layout/board/boardTab'
import Location from '../../components/layout/board/location'
import MainBoard from '../../components/layout/board/mainBoard'
import Match from '../../components/layout/board/match'
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

        {(tabMode === 'board' || tabMode === undefined) && boardDatas && (
          <MainBoard boardId={Number(boardDatas.content.id)} />
        )}

        {tabMode === 'location' && boardDatas?.content && (
          <Location {...boardDatas}></Location>
        )}

        {tabMode === 'match' && boardDatas?.content && (
          <Match
            boardId={boardDatas.content.id}
            employInfo={boardDatas?.content?.employ}
            isMatch={boardDatas?.content?.status}
          />
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
      `}</style>
    </>
  )
}

export default Board
