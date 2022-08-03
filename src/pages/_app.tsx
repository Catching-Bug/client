import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../core/redux/store/makeStore'

declare global {
  interface Window {
    kakao: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="middleContainer">
        <Component {...pageProps} />
      </div>

      <style jsx>{`
        .middleContainer {
          display: flex;
          justify-content: center;
          width: 100vw;
          height: 100vh;
        }
      `}</style>
    </>
  )
}

export default wrapper.withRedux(MyApp)
