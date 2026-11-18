import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'

/**
 * Infinite ticker. The strip leans slightly with scroll speed for a tactile, editorial feel.
 * Content is duplicated once so the CSS loop is seamless.
 */
export default function Marquee({ items, className = '', speed = 40 }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skewX = useTransform(velocity, [-2000, 0, 2000], [6, 0, -6], { clamp: true })

  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8 font-display text-5xl whitespace-nowrap italic sm:px-12 sm:text-7xl">{item}</span>
          <span className="text-2xl text-gold" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div ref={ref} className={`group overflow-hidden ${className}`}>
      <motion.div style={{ skewX }}>
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {row(false)}
          {row(true)}
        </div>
      </motion.div>
    </div>
  )
}
