import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import NavBar from '../components/layout/bottomNav/navBar'
import Button from '../components/layout/button/button'
import { RootState } from '../core/redux/module/rootReducer'

const Main = () => {
  const { loginStatus, loginUserInfo } = useSelector(
    (state: RootState) => state.loginStatusSlice,
  )

  useEffect(() => {
    if (typeof window !== undefined) {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }, [])

  return (
    <>
      <div className="mainContainer">
        <h1>
          CatchBug
          <span>
            <Image
              src={'/catchbug_icon.png'}
              width={30}
              height={30}
              alt={'캐치버그'}
            ></Image>
          </span>
        </h1>
        <h2>벌레를 대신 잡아줄 사람이 필요하세요?</h2>
        {loginStatus ? (
          <span>{`${loginUserInfo?.nickName}님 안녕하세요`}</span>
        ) : (
          <Link href={process.env.NEXT_PUBLIC_KAKAO_LOGIN}>
            <a>
              <Button className="loginButtonContainer">
                <Image
                  src={'/kakao_login_medium_narrow.png'}
                  width={183}
                  height={45}
                  alt={'로그인'}
                ></Image>
              </Button>
            </a>
          </Link>
        )}
      </div>
      <NavBar></NavBar>

      <style jsx>{`
        .mainContainer {
          max-width: 1024px;
          width: 100%;
          height: calc((var(--vh, 1vh) * 100));
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
