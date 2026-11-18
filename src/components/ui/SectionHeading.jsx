import { motion } from 'motion/react'
import Reveal from './Reveal'
import { easeLuxe } from '../motion/ease'

/** Eyebrow + large serif title (masked slide-up reveal) + optional intro. */
export default function SectionHeading({ eyebrow, title, intro, align = 'left', light = false, className = '' }) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal y={16}>
          <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>
        </Reveal>
      )}
      <h2
        className={`mt-5 overflow-hidden pb-[0.12em] font-display text-[40px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[58px] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        <motion.span
          className="block"
          initial={{ y: '105%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.1, ease: easeLuxe }}
        >
          {title}
        </motion.span>
      </h2>
      {intro && (
        <Reveal delay={150} y={20}>
          <p className={`mt-6 text-[16px] leading-relaxed ${light ? 'text-white/70' : 'text-muted'}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
