import { motion, useScroll, useSpring } from 'motion/react'

/** Thin gold reading-progress bar along the top edge of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
      style={{ scaleX }}
    />
  )
}
