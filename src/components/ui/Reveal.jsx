import { motion } from 'motion/react'
import { easeLuxe } from '../motion/ease'

const cache = {}
const motionTag = (tag) => (cache[tag] ??= motion.create(tag))

/** Fades and lifts children into view once, when scrolled into the viewport. */
export default function Reveal({ as = 'div', delay = 0, y = 36, className = '', children, ...rest }) {
  const Tag = motionTag(as)
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, ease: easeLuxe, delay: delay / 1000 }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}
