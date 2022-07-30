import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <div className="middleContainer">
          <Component {...pageProps} />
        </div>
      </SessionProvider>

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

export default MyApp
