import { useEffect } from 'react'
import { useBoardList } from '../../../hooks/useBoardList'

const List = () => {
  const { boardList } = useBoardList()

  return (
    <>
      <div className="listContainer"></div>
      <style jsx>{`
        .listContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #faf9f7;
        }
      `}</style>
    </>
  )
}

export default List
