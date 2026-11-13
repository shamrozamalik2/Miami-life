import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { locations } from '../../data/properties'

/** Local-SEO friendly list of Abu Dhabi communities linking to filtered listings. */
export default function Areas() {
  return (
    <section className="relative isolate overflow-hidden bg-navy py-24 sm:py-32">
      <img
        src="/images/abu-dhabi-grand-mosque.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />

      <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Abu Dhabi Communities</p>
          <h2 className="mt-5 font-display text-[40px] leading-[1.05] text-white sm:text-5xl lg:text-[58px]">
            Explore the capital, <em className="text-gold">area by area</em>
          </h2>
          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-white/65">
            From island living on Saadiyat and Al Reem to family neighbourhoods like Khalifa City — browse property
            by the community you want to call home.
          </p>
        </Reveal>

        <ul className="border-t border-white/10">
          {locations.map((loc, i) => (
            <Reveal as="li" key={loc} delay={i * 50} className="border-b border-white/10">
              <Link
                to={`/properties?location=${encodeURIComponent(loc)}`}
                className="group flex items-center justify-between py-5 transition-colors"
              >
                <span className="flex items-baseline gap-5">
                  <span className="w-6 text-[11px] font-semibold tracking-[0.2em] text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl text-white transition-all duration-500 ease-luxe group-hover:translate-x-2 group-hover:text-gold sm:text-4xl">
                    {loc}
                  </span>
                </span>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.3}
                  className="text-white/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
