import Image from 'next/image'
import NavBar from '../components/layout/bottomNav/navBar'
import LoginButton from '../components/layout/loginButton/loginButton'

const Main = () => {
  return (
    <>
      <div className="mainContainer">
        <h1>
          CatchBug
          <span>
            <Image src={'/catchbug_icon.png'} width={30} height={30}></Image>
          </span>
        </h1>
        <h2>벌레를 대신 잡아줄 사람이 필요하세요?</h2>
        <LoginButton></LoginButton>
      </div>
      <NavBar></NavBar>

      <style jsx>{`
        .mainContainer {
          max-width: 1024px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #faf9f7;
          animation: fadeIn 1s;
          overflow: hidden;
        }

        h1 {
          margin: 0;
        }

        h2 {
          font-size: 1em;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}

export default Main
