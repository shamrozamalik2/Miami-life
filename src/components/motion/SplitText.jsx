import { motion } from 'motion/react'
import { easeLuxe } from './ease'

/**
 * Word-by-word masked reveal for headlines.
 * `parts`: a string, or [{ text, className }] to style segments (e.g. a gold italic phrase).
 * `play`: when provided, animates on that flag (e.g. after the intro); otherwise on scroll into view.
 */
export default function SplitText({ parts, as: Tag = 'span', className = '', delay = 0, stagger = 0.07, play }) {
  const segments = typeof parts === 'string' ? [{ text: parts }] : parts
  const words = segments.flatMap((seg) =>
    seg.text
      .split(' ')
      .filter(Boolean)
      .map((w) => ({ w, className: seg.className || '' })),
  )
  const plain = segments.map((s) => s.text).join(' ')

  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, margin: '-8% 0px' } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <Tag className={`relative ${className}`}>
      <span className="sr-only">{plain}</span>
      <motion.span aria-hidden="true" initial="hidden" {...trigger} className="inline">
        {words.map(({ w, className: wc }, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
            <motion.span
              className={`inline-block ${wc}`}
              variants={{
                hidden: { y: '115%', rotate: 4 },
                show: {
                  y: 0,
                  rotate: 0,
                  transition: { duration: 1.05, ease: easeLuxe, delay: delay + i * stagger },
                },
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
