import '../styles/globals.css'
import { Outfit } from 'next/font/google'
import Layout from '../components/Layout'

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
})

export const metadata = {
    title: 'LearnKU',
    description: 'Karnavati University study materials - static demo',
    viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={outfit.variable}>
            <body>
                <Layout>{children}</Layout>
            </body>
        </html>
    )
}
