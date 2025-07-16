import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </SessionProvider>
  )
}
