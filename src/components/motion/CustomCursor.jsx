import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

/**
 * Desktop-only cursor follower: a gold dot plus a trailing ring that grows over
 * interactive elements. Elements with data-cursor="Label" show that label in a filled disc.
 * The native cursor stays visible, so nothing is lost for accessibility.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ hover: false, label: '' })
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e) => {
      const target = e.target.closest?.('[data-cursor], a, button, select, input, textarea, label')
      setState({ hover: !!target, label: target?.getAttribute?.('data-cursor') || '' })
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = state.label ? 92 : state.hover ? 54 : 34

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: state.label ? 'rgba(255,107,74,0.95)' : 'rgba(255,107,74,0)',
          borderColor: state.hover ? 'rgba(255,107,74,0.9)' : 'rgba(255,107,74,0.55)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        <motion.span
          className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy"
          animate={{ opacity: state.label ? 1 : 0, scale: state.label ? 1 : 0.6 }}
        >
          {state.label}
        </motion.span>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !state.label ? 1 : 0 }}
      />
    </div>
  )
}
