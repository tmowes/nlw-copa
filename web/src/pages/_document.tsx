import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#121214" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-900 bg-hero-bg bg-no-repeat bg-center bg-cover">
        <NextScript />
        <Main />
      </body>
    </Html>
  )
}
