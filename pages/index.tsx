import type { NextPage } from 'next'
import Map from '../src/components/map/map'
import { useSession, signIn, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Map latitude={33.5563} longitude={126.79581}></Map>
      {session ? (
        <button onClick={() => signOut()}>로그아웃</button>
      ) : (
        <button onClick={() => signIn('kakao')}>로그인</button>
      )}
    </>
  )
}

export default Home
