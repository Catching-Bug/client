import type { ReactElement } from 'react'
import type { DocumentContext, DocumentInitialProps } from 'next/document'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang="ko">
        <Head>
          <meta property="og:image" content="/home_icon.png" />
          <meta property="og:title" content="캐치버그" />
          <meta
            name="description"
            content="벌레 잡기가 무서울 때 도움을 청해보자"
          />
          <meta
            property="og:description"
            content="벌레 잡기가 무서울 때 도움을 청해보자"
          />
          <link rel="icon" href="/favicon.ico" />
          <script
            defer
            src="https://developers.kakao.com/sdk/js/kakao.min.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
