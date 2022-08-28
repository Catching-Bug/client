import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Body from '../../components/layout/board/body'
import Comment from '../../components/layout/board/comment'
import Button from '../../components/layout/button/button'
import Header from '../../components/layout/header/header'

const Board = () => {
  const router = useRouter()

  return (
    <>
      <div className="boardContainer">
        <Header
          onClick={() => {
            router.back()
          }}
        ></Header>

        <Body
          title={'임시제목입니다임시제목입니다임시제목입니다'}
          content={'임시내용임시내용임시내용'}
          creatorNickname={'익명'}
        ></Body>

        <Comment></Comment>

        <div className="fixedCommentContainer">
          <input className="commentInput"></input>
          <Button>게시</Button>
        </div>
      </div>

      <style jsx>{`
        .boardContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-color: #faf9f7;
          position: absolute;
        }

        .fixedCommentContainer {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          bottom: 0;
          width: 100%;
          height: 50px;
          background-color: white;
          box-shadow: 2px 2px 2px 2px rgb(0, 0, 0, 0.5);
        }

        .commentInput {
          width: 80%;
          height: 30px;
          padding: 0 10px;
          border-radius: 20px;
          border: 1px solid rgb(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  )
}

export default Board
