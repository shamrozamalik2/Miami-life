import { motion } from 'motion/react'
import { easeInOut } from './ease'

/**
 * Navy curtain between routes: on exit it sweeps up to cover the old page,
 * on enter it lifts away to reveal the new one. Used as the keyed child of AnimatePresence.
 */
export default function PageTransition({ children }) {
  return (
    <>
      {children}
      {/* covers the outgoing page */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] flex origin-bottom items-center justify-center bg-navy"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: easeInOut }}
      />
      {/* reveals the incoming page */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-navy"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.65, ease: easeInOut, delay: 0.1 } }}
        exit={{ scaleY: 0, transition: { duration: 0 } }}
      >
        <motion.span
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-3xl tracking-[0.3em] text-gold"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          MIAMI <em>LIFE</em>
        </motion.span>
      </motion.div>
    </>
  )
}
