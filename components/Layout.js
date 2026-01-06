'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import CursorParticles from './CursorParticles'

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme] = useState('dark')
  const { scrollY } = useScroll()
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95])
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <CursorParticles />
      <motion.header 
        className="site-header"
        style={{
          backgroundColor: useTransform(
            scrollY,
            [0, 100],
            ['rgba(10, 12, 16, 0.7)', 'rgba(10, 12, 16, 0.95)']
          ),
          backdropFilter: `blur(${headerBlur}px)`,
        }}
      >
        <div className="inner">
          <motion.div 
            className="brand"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href="/" className="logo">
              <motion.span 
                className="logo-mark"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                LK
              </motion.span>
              <span className="logo-text">
                <span className="text-gradient">Learn</span>
                <span className="text-accent">KU</span>
              </span>
            </Link>
          </motion.div>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
            />
          </button>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">Home</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="#departments">Departments</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <a href="#" className="primary-cta">Upload</a>
            </motion.div>
          </nav>
        </div>
      </motion.header>
      {/* decorative layered background blobs for a premium look */}
      <div className="bg-blobs" aria-hidden></div>

      <div className="page-shell">
        <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`} aria-label="Primary navigation">
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  Home
                </Link>
                <Link href="#departments" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                  Departments
                </Link>
              </div>

              <div className="nav-section">
                <span className="nav-section-title">Resources</span>
                <Link href="#features" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  How it works
                </Link>
                <Link href="#" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Study Materials
                </Link>
                <Link href="#" className="nav-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
