import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const LenisContext = createContext(null)

/** The active Lenis instance (null when reduced motion is preferred). */
export const useLenis = () => useContext(LenisContext)

/** Inertial smooth scrolling for the whole page. Disabled for prefers-reduced-motion. */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    })
    setLenis(instance)
    return () => instance.destroy()
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Locks page scrolling (native + Lenis) while `locked` is true — for menus, drawers and lightboxes. */
export function useScrollLock(locked) {
  const lenis = useLenis()
  useEffect(() => {
    if (!locked) return
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [locked, lenis])
}
