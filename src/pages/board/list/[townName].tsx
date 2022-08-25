import { useRouter } from 'next/router'
import Board from '../../../components/layout/board/board'
import Header from '../../../components/layout/header/header'
import { boardTypes } from '../../../components/utils/interface/boardType'
import { useBoardList } from '../../../hooks/useBoardList'

const List = () => {
  const router = useRouter()
  const { boardList } = useBoardList()

  return (
    <>
      <div className="listContainer">
        <Header onClick={() => router.back()} title={'둘러보기'}></Header>
        <div className="displayContainer">
          {boardList.map((board: boardTypes) => {
            return (
              <Board
                key={board.id}
                id={board.id}
                title={board.title}
                content={board.content}
                nickName={board.nickName}
              ></Board>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        .listContainer {
          max-width: 768px;
          width: 100%;
          height: 100%;
          align-items: center;
          overflow-y: scroll;
          overflow-x: hidden;
          position: absolute;
        }

        .displayContainer {
          margin-top: 50px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-color: white;
        }
      `}</style>
    </>
  )
}

export default List
