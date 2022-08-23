import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../core/redux/store/makeStore'
import Head from 'next/head'
import { useEffect } from 'react'
import { mockingCustomOverlay } from '../__mocks__/axiosMock'

declare global {
  interface Window {
    kakao: any
  }
}

mockingCustomOverlay()

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const setScreenSize = () => {
      let new_vh = window.innerHeight * 0.01

      document.documentElement.style.setProperty('--vh', `${new_vh}px`)
    }

    window.addEventListener('resize', () => setScreenSize())
  }, [])

  return (
    <>
      <Head>
        <title>캐치버그</title>
      </Head>
      <div className="middleContainer">
        <Component {...pageProps} />
      </div>

      <style jsx>{`
        .middleContainer {
          display: flex;
          justify-content: center;
          width: 100vw;
          height: calc(var(--vh, 1vh) * 100);
        }
      `}</style>
    </>
  )
}

export default wrapper.withRedux(MyApp)
