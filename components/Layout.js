import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light')
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  
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
                <span className="logo-text">
                  <span className="text-gradient">Learn</span>
                  <span className="text-accent">KU</span>
                </span>
              </Link>
          </div>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <Link href="/">Home</Link>
            <Link href="#departments">Departments</Link>
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
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
              <Link href="/" className="sidebar-logo">
                <span className="logo-mark">LK</span>
                <span className="brand-text">LearnKU</span>
              </Link>
            </div>
            
            <nav className="sidebar-nav">
              <div className="nav-section">
                <span className="nav-section-title">Menu</span>
                <Link href="/" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  Home
                </Link>
                <Link href="#departments" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                  </svg>
                  Departments
                </Link>
              </div>

              <div className="nav-section">
                <span className="nav-section-title">Resources</span>
                <Link href="#features" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  How it works
                </Link>
                <Link href="#" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  Study Materials
                </Link>
                <Link href="#" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Contribute
                </Link>
              </div>
            </nav>

            <div className="sidebar-footer">
              <div className="sidebar-foot-brand">
                <span className="logo-mark sm">LK</span>
                <span className="copyright">© {new Date().getFullYear()} LearnKU</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="app-main">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="logo-mark">LK</span>
              <span className="logo-text">
                <span className="text-gradient">Learn</span>
                <span className="text-accent">KU</span>
              </span>
            </Link>
            <p className="footer-tagline">Your gateway to academic excellence</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link href="/">Home</Link>
              <Link href="#departments">Departments</Link>
              <Link href="#features">Features</Link>
            </div>
            
            <div className="footer-section">
              <h4>Resources</h4>
              <Link href="#">Study Materials</Link>
              <Link href="#">Contribute</Link>
              <Link href="#">Upload</Link>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <Link href="#">About Us</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Help</Link>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} LearnKU. All rights reserved.</p>
          <div className="footer-meta">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
