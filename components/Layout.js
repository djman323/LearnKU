import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>LearnKU</title>
        <meta name="description" content="Karnavati University study materials - static demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="site-header">
        <div className="inner">
          <div className="brand">
              <Link href="/" className="logo">
                <span className="logo-mark">LK</span>
                <span className="logo-text">LearnKU</span>
              </Link>
          </div>

          <nav className="main-nav">
            <Link href="/">Home</Link>
            <a href="#" className="primary-cta">Upload</a>
          </nav>
        </div>
      </header>
      {/* decorative layered background blobs for a premium look */}
      <div className="bg-blobs" aria-hidden></div>

      <div className="page-shell">
        <aside className="sidebar" aria-label="Primary navigation">
          <div className="sidebar-inner">
            <div className="sidebar-brand">
              <Link href="/">LearnKU</Link>
            </div>
            <nav className="sidebar-nav">
              <Link href="/">Home</Link>
              <Link href="#departments">Departments</Link>
              <Link href="#features">How it works</Link>
              <Link href="#">Contribute</Link>
            </nav>
            <div className="sidebar-foot">© LearnKU</div>
          </div>
        </aside>

        <main className="app-main">{children}</main>
      </div>

      <footer className="site-footer">
        <div className="inner">© LearnKU — premium demo</div>
      </footer>
    </>
  )
}
