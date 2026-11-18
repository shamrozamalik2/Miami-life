import { Link } from 'react-router-dom'
import { ArrowUpRight, Bath, BedDouble, MapPin, Maximize } from 'lucide-react'
import SampleBadge from '../ui/SampleBadge'
import { formatArea, formatPrice, placeName } from '../../utils/format'

export default function PropertyCard({ property, priority = false }) {
  const { slug, title, purpose, type, price, location, bedrooms, bathrooms, area, images } = property
  const href = `/properties/${slug}`

  return (
    <article className="group relative flex h-full flex-col bg-white transition-shadow duration-700 ease-luxe hover:shadow-[0_30px_60px_-30px_rgba(14,14,16,0.35)]">
      <Link
        to={href}
        data-cursor="View"
        className="relative block aspect-[4/3] overflow-hidden bg-sand"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={images[0].src}
          alt={images[0].alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
              purpose === 'buy' ? 'bg-gold text-navy' : 'bg-navy text-white'
            }`}
          >
            {purpose === 'buy' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <SampleBadge className="absolute top-4 right-4" />
        <span className="absolute bottom-4 left-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/90">
          {type}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-muted">
          <MapPin size={13} className="text-gold" aria-hidden="true" />
          {placeName(location)}
        </p>
        <h3 className="mt-3 font-display text-[26px] leading-tight text-navy">
          <Link to={href} className="transition-colors duration-300 hover:text-gold-dark">
            {title}
          </Link>
        </h3>
        <p className="mt-3 text-[18px] font-semibold tracking-tight text-navy">{formatPrice(price, purpose)}</p>

        <ul className="mt-6 grid grid-cols-3 border-y border-navy/10 py-4 text-[13px] text-ink/80">
          <li className="flex items-center gap-2">
            <BedDouble size={16} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
            <span>
              {bedrooms} <span className="sr-only">{bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
              <span aria-hidden="true">{bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </span>
          </li>
          <li className="flex items-center gap-2 border-x border-navy/10 pl-3">
            <Bath size={16} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
            <span>
              {bathrooms} <span className="sr-only">{bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
              <span aria-hidden="true">{bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </span>
          </li>
          <li className="flex items-center gap-2 pl-3">
            <Maximize size={15} strokeWidth={1.5} className="text-gold" aria-hidden="true" />
            <span className="whitespace-nowrap">{formatArea(area)}</span>
          </li>
        </ul>

        <Link
          to={href}
          className="mt-auto flex items-center justify-between pt-5 text-[12px] font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:text-gold-dark"
          aria-label={`View details: ${title}`}
        >
          View Details
          <span className="flex h-10 w-10 items-center justify-center border border-navy/15 transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold">
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </article>
  )
}
