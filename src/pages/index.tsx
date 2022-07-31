import type { NextPage } from 'next'
import Map from '../components/layout/map/map'
import { useSession, signIn, signOut } from 'next-auth/react'
import NavBar from '../components/layout/bottomNav/navBar'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Map></Map>

      <NavBar></NavBar>
      {/* {session ? (
          <button onClick={() => signOut()} type="button">
            로그아웃
          </button>
        ) : (
          <button onClick={() => signIn('kakao')} type="button">
            로그인
          </button>
        )} */}
    </>
  )
}

export default Home
