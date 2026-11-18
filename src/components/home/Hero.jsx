import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import StarRating from '../ui/StarRating'
import SplitText from '../motion/SplitText'
import Magnetic from '../motion/Magnetic'
import CountUp from '../motion/CountUp'
import { useIntroDone } from '../motion/Intro'
import { easeInOut, easeLuxe } from '../motion/ease'
import { company } from '../../data/company'

const HERO_IMG = '/images/miami-brickell-aerial.webp'

export default function Hero() {
  const play = useIntroDone()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1, ease: easeLuxe, delay },
  })

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy">
      {/* Mobile / tablet: full-bleed background image */}
      <div className="absolute inset-0 -z-10 overflow-hidden lg:hidden">
        <motion.img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          style={{ y: imgY, scale: imgScale }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy" />
      </div>

      <div className="grid min-h-[100svh] lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative flex items-center">
          <div className="w-full px-5 pt-44 pb-40 sm:px-8 lg:mr-0 lg:ml-auto lg:max-w-[700px] lg:px-12 lg:pt-40 lg:pb-48">
            <motion.p className="eyebrow" {...fade(0)}>
              Real Estate Agent · Miami, Florida
            </motion.p>
            <SplitText
              as="h1"
              play={play}
              delay={0.15}
              className="mt-7 block font-display text-[52px] leading-[0.98] font-normal tracking-[-0.015em] text-white sm:text-7xl xl:text-[92px]"
              parts={[
                { text: 'Find Your' },
                { text: 'Perfect Property', className: 'italic text-gold' },
                { text: 'in Miami' },
              ]}
            />
            <motion.p className="mt-8 max-w-lg text-[17px] leading-relaxed text-white/75" {...fade(0.7)}>
              Buying, renting or relocating to Miami? We help you find the right home in Brickell, Downtown and beyond —
              and guide you through every step, from the first viewing to the keys.
            </motion.p>
            <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4" {...fade(0.85)}>
              <Magnetic>
                <Link to="/properties" className="btn-gold w-full sm:w-auto">
                  Explore Properties <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/contact" className="btn-outline-light w-full sm:w-auto">
                  Contact Our Team
                </Link>
              </Magnetic>
            </motion.div>

            <motion.a
              href={company.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-14 inline-flex items-center gap-4"
              {...fade(1)}
            >
              <span className="font-display text-5xl leading-none text-white">
                {play ? <CountUp to={company.rating} /> : company.rating}
              </span>
              <span className="h-10 w-px bg-white/20" />
              <span>
                <StarRating rating={company.rating} size={15} />
                <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {company.reviewCount} reviews on Google
                </span>
              </span>
            </motion.a>
          </div>
        </motion.div>

        {/* Desktop imagery: wipes in from the right, then drifts with scroll */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
          animate={play ? { clipPath: 'inset(0% 0% 0% 0%)' } : undefined}
          transition={{ duration: 1.5, ease: easeInOut, delay: 0.1 }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.img
              src={HERO_IMG}
              alt="Aerial view of Brickell condo towers on Biscayne Bay, Miami"
              fetchPriority="high"
              style={{ y: imgY, scale: imgScale }}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/10 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Floating detail card (outside the clipped image so it can overlap the copy column) */}
      <motion.figure
        className="absolute bottom-40 left-[calc(51%-4rem)] hidden w-[300px] border border-gold/40 bg-navy/80 p-3 backdrop-blur-md lg:block xl:w-[340px]"
        initial={{ opacity: 0, y: 60 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 1.2, ease: easeLuxe, delay: 1.1 }}
      >
        <div className="animate-float">
          <img
            src="/images/living-modern-open.webp"
            alt="Modern open-plan condo living and dining room"
            className="aspect-[16/10] w-full object-cover"
          />
          <figcaption className="px-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Condos · Homes · Rentals
          </figcaption>
        </div>
      </motion.figure>

      {/* scroll cue */}
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 xl:flex"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}
