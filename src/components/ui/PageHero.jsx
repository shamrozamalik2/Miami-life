import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { easeLuxe } from '../motion/ease'

/** Banner at the top of inner pages: parallax background, breadcrumb, masked title reveal. */
export default function PageHero({ eyebrow, title, intro, image, crumbs = [] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const fade = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: easeLuxe, delay },
  })

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy pt-36 pb-20 sm:pt-44 sm:pb-28">
      {image && (
        <>
          <motion.img
            src={image}
            alt=""
            aria-hidden="true"
            style={{ y, scale: 1.15 }}
            className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" />
        </>
      )}
      <motion.div style={{ y: textY }} className="container-luxe">
        <motion.nav aria-label="Breadcrumb" className="mb-8" {...fade(0.3)}>
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            <li>
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <ChevronRight size={12} aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>
        {eyebrow && (
          <motion.p className="eyebrow" {...fade(0.4)}>
            {eyebrow}
          </motion.p>
        )}
        <h1 className="mt-5 max-w-4xl overflow-hidden pb-[0.12em] font-display text-5xl font-normal leading-[1.02] text-white sm:text-6xl lg:text-7xl">
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: easeLuxe, delay: 0.45 }}
          >
            {title}
          </motion.span>
        </h1>
        {intro && (
          <motion.p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70" {...fade(0.7)}>
            {intro}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
