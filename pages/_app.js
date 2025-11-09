import '../styles/globals.css'
import Layout from '../components/Layout'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Set dark theme as default
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
