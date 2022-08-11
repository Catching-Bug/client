import Image from 'next/image'
import { useRouter } from 'next/router'
import Button from '../../components/layout/button/button'

const Create = () => {
  const router = useRouter()

  const requestBoardToServer = () => {}

  return (
    <>
      <div className="boardContainer">
        <div className="headerBar">
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
          <h1>🐞도움청하기</h1>
          <Button className={'locationChangeButton'} onClick={() => {}}>
            내 위치 변경
          </Button>
        </div>

        <div className="inputContainer">
          <label>이 곳이 현재 계신 곳이 맞으신가요?</label>
          <input
            className="inputBox"
            disabled
            placeholder="위치 설정이 필요합니다."
          ></input>
          <label htmlFor={'title'}>제목</label>
          <input
            className="inputBox"
            type={'text'}
            id={'title'}
            placeholder={'EX) 도와주세요'}
          ></input>
          <label htmlFor={'description'}>내용</label>
          <textarea
            className="textareaBox"
            id={'description'}
            placeholder={'바퀴벌레 너무 커요..'}
            maxLength={100}
          ></textarea>
        </div>

        <Button className="doneButton" onClick={requestBoardToServer}>
          완료
        </Button>
      </div>

      <style jsx>{`
        .boardContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
          background-color: #faf9f7;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          overflow-y: auto;
        }

        .headerBar {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          user-select: none;
        }

        .inputContainer {
          max-width: 80%;
          width: 800px;
          display: flex;
          flex-direction: column;
          margin: 20px 0;
        }

        h1 {
          font-size: 1.5em;
        }

        label {
          color: gray;
        }

        .inputBox {
          border-radius: 7px;
          width: 100%;
          height: 50px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          font-size: 1.3em;
          padding-left: 5px;
          margin: 20px 0;
        }

        .textareaBox {
          border-radius: 7px;
          width: 100%;
          height: 200px;
          border: solid 1px #e8e8e8;
          border-radius: 10px;
          font-size: 1.3em;
          padding-left: 5px;
          margin: 20px 0;
        }
      `}</style>
    </>
  )
}

export default Create
