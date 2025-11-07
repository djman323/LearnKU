import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>LearnKU</title>
        <meta name="description" content="Karnavati University study materials - static demo" />
      </Head>
      <header className="site-header">
        <div className="inner">
          <h2 className="logo">LearnKU</h2>
          <nav>
            <a href="/">Home</a>
          </nav>
        </div>
      </header>
      <div style={{paddingTop:80}}>{children}</div>
      <footer className="site-footer">
        <div className="inner">© LearnKU — static demo</div>
      </footer>
    </>
  )
}
