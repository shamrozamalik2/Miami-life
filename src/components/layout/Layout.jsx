import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'

/** Scroll to top on page change (but not when only filters in the query string change). */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only z-[60] bg-gold px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
