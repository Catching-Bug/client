import Router from 'next/router'
import BoardList from '../../../components/layout/board/boardList'
import Header from '../../../components/layout/header/header'
import { boardTypes } from '../../../components/utils/interface/boardType'
import { useBoardList } from '../../../hooks/useBoardList'

const List = () => {
  const { boardList } = useBoardList()

  return (
    <>
      <div className="listContainer">
        <Header onClick={() => Router.back()} title={'둘러보기'}></Header>
        <div className="displayContainer">
          {boardList.map((board: boardTypes) => {
            return (
              <BoardList
                key={board.id}
                title={board.title}
                content={board.content}
                nickName={board.nickName}
                onClick={() => {
                  Router.push(`/board/${board.id}`)
                }}
              ></BoardList>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .listContainer {
          max-width: 768px;
          width: 100%;
          height: calc((var(--vh, 1vh) * 100));
          align-items: center;
          overflow-y: auto;
          overflow-x: hidden;
          position: absolute;
          background-color: white;
        }

        .displayContainer {
          margin-top: 50px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}

export default List
