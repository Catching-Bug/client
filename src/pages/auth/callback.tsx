import Router from 'next/router'
import { useEffect } from 'react'
import Loading from '../../components/layout/loading/loading'

const Callback = () => {
  useEffect(() => {
    const authorizationCode = new URL(window.location.href).searchParams.get(
      'code',
    )

    Router.replace('/')
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
