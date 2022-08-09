import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const LoginButton = () => {
  const [loginStatus, setLoginStatus] = useState(false)

  return (
    <>
      <div className="loginButtonContainer">
        {loginStatus ? (
          <button
            onClick={() => {
              setLoginStatus(!loginStatus)
            }}
            type="button"
          >
            로그아웃
          </button>
        ) : (
          <Link href={process.env.NEXT_PUBLIC_KAKAO_LOGIN!}>
            <button type="button">
              <Image
                src={'/kakao_login_medium_narrow.png'}
                width={183}
                height={45}
                alt={'로그인'}
              ></Image>
            </button>
          </Link>
        )}
      </div>
      <style jsx>{`
        .loginButtonContainer {
          border-radius: 20px;
        }

        button {
          border: none;
          cursor: pointer;
          padding: 0;
        }
      `}</style>
    </>
  )
}

export default LoginButton
