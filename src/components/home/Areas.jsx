import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import SplitText from '../motion/SplitText'
import { locations } from '../../data/properties'

// Preview image per neighborhood (illustrative photography)
const areaImages = {
  Brickell: '/images/miami-brickell-aerial.webp',
  'Coconut Grove': '/images/townhouse-modern.webp',
  'Coral Gables': '/images/villa-courtyard-pool.webp',
  'Downtown Miami': '/images/miami-skyline-sunset.webp',
  Edgewater: '/images/miami-skyline-palms.webp',
  'Key Biscayne': '/images/villa-contemporary-pool.webp',
  'Miami Beach': '/images/miami-beach-aerial.webp',
  Pinecrest: '/images/villa-garden-evening.webp',
}

/** Local-SEO friendly list of Miami neighborhoods; hovering shows a floating photo preview (desktop). */
export default function Areas() {
  const [active, setActive] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 })

  const onMove = (e) => {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return (
    <section className="relative isolate overflow-hidden bg-navy py-24 sm:py-32">
      <img
        src="/images/miami-skyline-palms.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />

      <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">Miami Neighborhoods</p>
          <SplitText
            as="h2"
            className="mt-5 block font-display text-[40px] leading-[1.05] text-white sm:text-5xl lg:text-[58px]"
            parts={[{ text: 'Explore Miami,' }, { text: 'area by area', className: 'italic text-gold' }]}
          />
          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-white/65">
            From high-rise living in Brickell and Downtown to the beaches, Coconut Grove and family-friendly Pinecrest —
            browse property by the neighborhood you want to call home.
          </p>
        </Reveal>

        <ul className="border-t border-white/10" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
          {locations.map((loc, i) => (
            <Reveal as="li" key={loc} delay={i * 60} className="border-b border-white/10">
              <Link
                to={`/properties?location=${encodeURIComponent(loc)}`}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(loc)}
                data-cursor="Explore"
                className="group relative flex items-center justify-between py-6"
              >
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
                <span className="flex items-baseline gap-5">
                  <span className="w-6 text-[11px] font-semibold tracking-[0.2em] text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl text-white transition-all duration-500 ease-luxe group-hover:translate-x-3 group-hover:italic group-hover:text-gold sm:text-[44px]">
                    {loc}
                  </span>
                </span>
                <ArrowUpRight
                  size={24}
                  strokeWidth={1.3}
                  className="text-white/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* Floating preview that follows the pointer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-[260px] w-[200px] lg:block"
        style={{ x: sx, y: sy, translateX: '30px', translateY: '-50%' }}
      >
        <AnimatePresence>
          {active && (
            <motion.img
              key={active}
              src={areaImages[active]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover shadow-2xl"
              initial={{ opacity: 0, scale: 0.85, rotate: -4, clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
