import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import StarRating from '../ui/StarRating'
import { company } from '../../data/company'

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {/* Mobile / tablet: full-bleed background image */}
      <div className="absolute inset-0 -z-10 lg:hidden">
        <img
          src="/images/miami-brickell-aerial.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-full w-full animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy" />
      </div>

      <div className="grid min-h-[100svh] lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="relative flex items-center">
          <div className="w-full px-5 pt-44 pb-40 sm:px-8 lg:mr-0 lg:ml-auto lg:max-w-[700px] lg:px-12 lg:pt-40 lg:pb-48">
            <p className="eyebrow animate-fade-up">Real Estate Agent · Miami, Florida</p>
            <h1 className="mt-7 animate-fade-up font-display text-[52px] leading-[0.98] font-normal tracking-[-0.015em] text-white [animation-delay:120ms] sm:text-7xl xl:text-[92px]">
              Find Your <em className="text-gold">Perfect Property</em> in Miami
            </h1>
            <p className="mt-8 max-w-lg animate-fade-up text-[17px] leading-relaxed text-white/75 [animation-delay:240ms]">
              Buying, renting or relocating to Miami? We help you find the right home in Brickell, Downtown and
              beyond — and guide you through every step, from the first viewing to the keys.
            </p>
            <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:gap-4">
              <Link to="/properties" className="btn-gold">
                Explore Properties <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-light">
                Contact Our Team
              </Link>
            </div>

            <a
              href={company.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-14 inline-flex animate-fade-up items-center gap-4 [animation-delay:480ms]"
            >
              <span className="font-display text-5xl leading-none text-white">{company.rating}</span>
              <span className="h-10 w-px bg-white/20" />
              <span>
                <StarRating rating={company.rating} size={15} />
                <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {company.reviewCount} reviews on Google
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Desktop imagery */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/images/miami-brickell-aerial.webp"
              alt="Aerial view of Brickell condo towers on Biscayne Bay, Miami"
              fetchPriority="high"
              className="h-full w-full animate-slow-zoom object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/10 to-transparent" />
          </div>

          <figure className="absolute bottom-40 -left-16 w-[300px] animate-fade-up border border-gold/40 bg-navy/80 p-3 backdrop-blur-md [animation-delay:700ms] xl:w-[340px]">
            <img
              src="/images/living-modern-open.webp"
              alt="Modern open-plan condo living and dining room"
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between px-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
              Condos · Homes · Rentals
            </figcaption>
          </figure>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 xl:flex">
        <span className="h-12 w-px animate-pulse bg-gradient-to-b from-transparent to-gold" />
      </div>
    </section>
  )
}
