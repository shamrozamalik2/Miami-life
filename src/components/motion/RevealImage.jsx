import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { easeInOut } from './ease'

/**
 * Image that wipes into view (clip-path) and then drifts with a gentle parallax while scrolling.
 * Give it a size via className (e.g. an aspect ratio).
 */
export default function RevealImage({ src, alt, className = '', direction = 'up', parallax = 10, loading = 'lazy' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  const hidden = {
    up: 'inset(100% 0% 0% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }[direction]

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-navy ${className}`}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.3, ease: easeInOut }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={{ y, scale: 1 + (parallax * 2.4) / 100 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </motion.div>
  )
}
