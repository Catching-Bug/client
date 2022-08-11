import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../../components/layout/button/button'

const Create = () => {
  const router = useRouter()

  const requestBoardToServer = () => {}

  return (
    <>
      <div className="boardContainer">
        <Button
          className="prevButton"
          onClick={() => {
            router.back()
          }}
        >
          <Image
            src={'/previous_btn.png'}
            width={40}
            height={40}
            alt={'뒤로가기'}
          ></Image>
        </Button>

        <div className="inputContainer">
          <h1>🐞벌레 사냥 요청하기</h1>
          <label htmlFor={'title'}>제목</label>
          <input
            className="borderingBox"
            type={'text'}
            id={'title'}
            placeholder={'EX) 도와주세요'}
          ></input>
          <label htmlFor={'description'}>내용</label>
          <input
            className="borderingBox"
            type={'text'}
            id={'description'}
            placeholder={'바퀴벌레 너무 커요..'}
          ></input>
          <label>내 위치</label>
          <div className="borderingBox" />
        </div>

        <Button className="doneButton" onClick={requestBoardToServer}>
          완료
        </Button>
      </div>

      <style jsx>{`
        .boardContainer {
          position: absolute;
          max-width: 1024px;
          width: 100%;
          height: 100%;
          background-color: #faf9f7;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-y: auto;
        }

        .inputContainer {
          max-width: 80%;
          width: 800px;
          margin-bottom: 70px;
        }

        h1 {
          font-size: 1.5em;
        }

        label {
          color: gray;
        }

        .borderingBox {
          border-radius: 7px;
          width: 100%;
          height: 50px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          margin: 10px 0;
          font-size: 1.3em;
        }
      `}</style>
    </>
  )
}

export default Create
