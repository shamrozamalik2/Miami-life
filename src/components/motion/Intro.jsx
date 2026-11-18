import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from './SmoothScroll'
import { easeInOut, easeLuxe } from './ease'

const IntroContext = createContext(true)

/** True once the intro preloader has finished (or was skipped). Hero animations wait for this. */
export const useIntroDone = () => useContext(IntroContext)

const STORAGE_KEY = 'ml-intro-seen'

function shouldShowIntro() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(STORAGE_KEY)
  } catch {
    return false
  }
}

const letters = (word) => word.split('')

/** Branded intro shown once per browser session, then a curtain lifts to reveal the page. */
export function IntroProvider({ children }) {
  const [show, setShow] = useState(shouldShowIntro)
  const [done, setDone] = useState(!show)
  const lenis = useLenis()

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* storage unavailable — intro simply shows again next time */
    }
    document.documentElement.style.overflow = 'hidden'
    lenis?.stop()
    const t = setTimeout(() => setShow(false), 2300)
    // Let the page start animating in while the curtain is still lifting
    const t2 = setTimeout(() => setDone(true), 2750)
    return () => {
      clearTimeout(t)
      clearTimeout(t2)
      document.documentElement.style.overflow = ''
      lenis?.start()
    }
  }, [show, lenis])

  return (
    <IntroContext.Provider value={done}>
      {children}
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {show && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1, ease: easeInOut }}
            aria-hidden="true"
          >
            <div className="flex items-baseline gap-5 font-display text-5xl tracking-[0.22em] text-white sm:text-7xl">
              {['MIAMI', 'LIFE'].map((word, w) => (
                <span key={word} className={`flex overflow-hidden ${w === 1 ? 'italic text-gold' : ''}`}>
                  {letters(word).map((ch, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: easeLuxe, delay: 0.15 + (w * 5 + i) * 0.05 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </div>
            <motion.div
              className="mt-6 h-px w-64 origin-left bg-gold sm:w-96"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: easeInOut, delay: 0.5 }}
            />
            <motion.p
              className="mt-5 text-[11px] font-semibold tracking-[0.5em] text-gold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              REAL ESTATE · MIAMI
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  )
}
