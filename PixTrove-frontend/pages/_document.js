import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <body className="bg-background text-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
