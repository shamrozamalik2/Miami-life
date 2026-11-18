import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import SplitText from '../motion/SplitText'
import Magnetic from '../motion/Magnetic'
import PropertyCard from '../property/PropertyCard'
import useMediaQuery from '../../hooks/useMediaQuery'
import { featuredProperties } from '../../data/properties'

const items = featuredProperties.slice(0, 6)
const intro =
  'A selection of sample listings showing how condos, homes and penthouses across Miami can be presented to buyers and tenants.'

/** Desktop: the section pins and the cards travel horizontally as the page scrolls. */
function PinnedShowcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const [index, setIndex] = useState(1)

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  useMotionValueEvent(scrollYProgress, 'change', (v) =>
    setIndex(Math.min(items.length, Math.max(1, Math.round(v * (items.length - 1)) + 1))),
  )

  return (
    <section ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-8 pr-[8vw] pl-[max(3rem,calc((100vw-1320px)/2+3rem))]"
        >
          {/* Intro panel */}
          <div className="flex w-[420px] shrink-0 flex-col justify-center pr-6">
            <p className="eyebrow">Featured Properties</p>
            <SplitText
              as="h2"
              className="mt-5 block font-display text-[58px] leading-[1.02] text-navy"
              parts={[{ text: 'Homes worth' }, { text: 'a closer look', className: 'italic text-gold-dark' }]}
            />
            <p className="mt-6 text-[16px] leading-relaxed text-muted">{intro}</p>
            <div className="mt-10">
              <Magnetic>
                <Link to="/properties" className="btn-outline-dark">
                  View all properties <ArrowRight size={16} />
                </Link>
              </Magnetic>
            </div>
          </div>

          {items.map((p, i) => (
            <div key={p.id} className="w-[400px] shrink-0 xl:w-[430px]" style={{ marginTop: i % 2 ? '3.5rem' : 0 }}>
              <PropertyCard property={p} />
            </div>
          ))}
        </motion.div>

        {/* progress */}
        <div className="container-luxe mt-12 flex items-center gap-6">
          <span className="font-display text-xl text-navy tabular-nums">
            {String(index).padStart(2, '0')}{' '}
            <span className="text-muted">/ {String(items.length).padStart(2, '0')}</span>
          </span>
          <div className="relative h-px flex-1 bg-navy/10">
            <motion.div className="absolute inset-0 origin-left bg-gold" style={{ scaleX: smooth }} />
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

/** Mobile & tablet: native swipe carousel with snap points. */
function SwipeShowcase() {
  return (
    <section className="w-full overflow-hidden py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Featured Properties"
          title={
            <>
              Homes worth <em className="text-gold-dark">a closer look</em>
            </>
          }
          intro={intro}
        />
      </div>
      <div className="no-scrollbar relative mt-12 flex w-full max-w-full snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-5 pb-4 sm:px-8">
        {items.map((p) => (
          <div key={p.id} className="w-[84vw] max-w-[400px] shrink-0 snap-start">
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
      <div className="container-luxe mt-8">
        <Link to="/properties" className="btn-outline-dark">
          View all properties <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

export default function FeaturedProperties() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  return desktop ? <PinnedShowcase /> : <SwipeShowcase />
}
