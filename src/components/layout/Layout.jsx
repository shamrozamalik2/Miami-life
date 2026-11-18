import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import Header from './Header'
import Footer from './Footer'
import FloatingWhatsApp from './FloatingWhatsApp'
import PageTransition from '../motion/PageTransition'
import ScrollProgress from '../motion/ScrollProgress'
import CustomCursor from '../motion/CustomCursor'
import { useLenis } from '../motion/SmoothScroll'

export default function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const lenis = useLenis()

  // Runs while the curtain fully covers the screen, so the jump to the top is invisible
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-gold px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        {/* Keyed by pathname only: filter changes (?purpose=…) do not trigger a page transition */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CustomCursor />
    </>
  )
}
