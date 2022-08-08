import type { NextPage } from 'next'
import Map from '../components/layout/map/map'
import NavBar from '../components/layout/bottomNav/navBar'
import { useState } from 'react'
import Link from 'next/link'
import { RootState } from '../core/redux/module/rootReducer'
import { useSelector } from 'react-redux'

const Home: NextPage = () => {
  const [loginStatus, setLoginStatus] = useState(false)
  const { modalOpen } = useSelector((state: RootState) => state.modalOpenSlice)
  return (
    <>
      <Map></Map>

      {!modalOpen && <NavBar />}
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
          <button type="button">로그인</button>
        </Link>
      )}
    </>
  )
}

export default Home
