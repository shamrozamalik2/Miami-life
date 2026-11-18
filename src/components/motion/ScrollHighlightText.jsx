import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className={accent ? 'italic text-gold' : ''}>
      {children}{' '}
    </motion.span>
  )
}

/**
 * Large statement whose words light up one by one as the reader scrolls through it.
 * Words listed in `accent` are set in gold italic.
 */
export default function ScrollHighlightText({ text, accent = [], className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    // Words stay real inline text (only their opacity animates), so screen readers read the sentence normally
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={accent.includes(w.replace(/[.,—]/g, ''))}
        >
          {w}
        </Word>
      ))}
    </p>
  )
}
