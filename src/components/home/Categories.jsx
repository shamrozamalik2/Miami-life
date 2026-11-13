import { Link } from 'react-router-dom'
import { ArrowUpRight, Building, Building2, Home, Hotel } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { properties, propertyTypes } from '../../data/properties'

const typeIcons = { Apartment: Building2, Villa: Home, Townhouse: Building, Penthouse: Hotel }

const categories = [
  {
    purpose: 'buy',
    label: 'Buy',
    title: 'Properties for Sale',
    text: 'Apartments, villas and townhouses for end-users and investors across Abu Dhabi’s most sought-after communities.',
    image: '/images/villa-white-pool.webp',
    alt: 'Contemporary white villa with a private pool',
  },
  {
    purpose: 'rent',
    label: 'Rent',
    title: 'Properties for Rent',
    text: 'Find the right home on an annual lease — from city apartments on Al Reem Island to family villas with gardens.',
    image: '/images/interior-waterview-lounge.webp',
    alt: 'Furnished apartment lounge with tall windows overlooking the water',
  },
]

export default function Categories() {
  return (
    <section className="bg-sand py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          align="center"
          eyebrow="Buy or Rent"
          title={
            <>
              Start with <em className="text-gold-dark">what you need</em>
            </>
          }
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {categories.map((c, i) => (
            <Reveal key={c.purpose} delay={i * 150}>
              <Link
                to={`/properties?purpose=${c.purpose}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-navy sm:aspect-[16/11]"
              >
                <img
                  src={c.image}
                  alt={c.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/5 transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-11">
                  <span className="self-start border border-white/30 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                    {c.label}
                  </span>
                  <div>
                    <h3 className="font-display text-4xl text-white sm:text-5xl">{c.title}</h3>
                    <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">{c.text}</p>
                    <span className="mt-7 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-gold">
                      Browse listings
                      <span className="flex h-10 w-10 items-center justify-center border border-gold/50 transition-all duration-500 ease-luxe group-hover:bg-gold group-hover:text-navy">
                        <ArrowUpRight size={16} />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-px bg-navy/10 lg:grid-cols-4">
          {propertyTypes.map((type, i) => {
            const Icon = typeIcons[type]
            const count = properties.filter((p) => p.type === type).length
            return (
              <Reveal key={type} delay={i * 80} className="bg-sand">
                <Link
                  to={`/properties?type=${type}`}
                  className="group flex h-full flex-col items-start gap-4 bg-ivory p-6 transition-colors duration-500 hover:bg-navy sm:flex-row sm:items-center sm:p-8"
                >
                  <Icon size={28} strokeWidth={1.2} className="text-gold" aria-hidden="true" />
                  <span>
                    <span className="block font-display text-2xl text-navy transition-colors group-hover:text-white">
                      {type}s
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-white/50">
                      {count} sample {count === 1 ? 'listing' : 'listings'}
                    </span>
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
