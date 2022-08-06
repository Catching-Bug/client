import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Loading from '../../components/layout/loading/loading'

const Callback: () => JSX.Element = () => {
  const router = useRouter()

  const getAuthorizationCode = () => {
    const authorizationCode = new URL(window.location.href).searchParams.get(
      'code',
    )

    return authorizationCode
  }

  useEffect(() => {
    getAuthorizationCode()

    router.replace('/')
  }, [])

  return (
    <>
      <div className="loadingContainer">
        <Loading />
      </div>

      <style jsx>{`
        .loadingContainer {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default Callback
