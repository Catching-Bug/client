import Image from 'next/image'
import { boardTypes } from '../../utils/interface/boardType'

/**
 * 게시글 관련한 컴포넌트입니다
 * @param id primary key값
 * @param title board 제목
 * @param content board 내용
 * @param nickname board 작성자
 */
const Board = ({ id, title, content, nickName }: boardTypes) => {
  const handleToGoDetailBoard = () => {
    // 보드 상세정보로 이동하는 함수
  }

  return (
    <>
      <button type="button" onClick={handleToGoDetailBoard}>
        <div className="boardConatiner">
          <div className="image">
            <Image
              width={50}
              height={50}
              src={'/catchbug_icon.png'}
              alt={'보드이미지'}
            ></Image>
          </div>
          <div className="bodyContainer">
            <h1 className="title">{title}</h1>
            <span className="nickName">{nickName}</span>
            <span className="content">{content}</span>
          </div>
        </div>
      </button>
      <hr />

      <style jsx>{`
        button {
          border: none;
          background-color: white;
          cursor: pointer;
        }

        button:hover {
          background-color: lightgray;
        }

        .boardConatiner {
          width: 100%;
          height: 120px;
          padding: 10px;
          display: flex;
          align-items: center;
        }

        .image {
          min-width: 70px;
          min-height: 70px;
          border-radius: 30%;
          border: 1px solid black;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bodyContainer {
          padding-left: 20px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .title {
          color: black;
          font-size: 1.4em;
          margin: 0;
        }

        .nickName {
          padding: 5px 0;
          color: grey;
          font-size: 0.7em;
        }

        .content {
          display: inline-block;
          color: black;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        hr {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Board
