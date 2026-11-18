import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import Logo from '../ui/Logo'
import StarRating from '../ui/StarRating'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import { company } from '../../data/company'
import { locations } from '../../data/properties'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white/70">
      <div className="container-luxe grid gap-14 pt-20 pb-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-7 max-w-sm text-[15px] leading-relaxed">
            {company.name} is a Miami real estate agent helping clients buy, rent and relocate across Brickell,
            Downtown Miami and beyond.
          </p>
          <a
            href={company.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-4 border border-white/10 px-5 py-4 transition-colors hover:border-gold/60"
          >
            <span className="font-display text-4xl leading-none text-white">{company.rating}</span>
            <span>
              <StarRating rating={company.rating} size={14} />
              <span className="mt-1.5 block text-[11px] uppercase tracking-[0.18em] text-white/50">
                {company.reviewCount} Google reviews
              </span>
            </span>
          </a>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Explore</h3>
          <ul className="mt-6 space-y-3.5 text-[15px]">
            {[
              ['Properties', '/properties'],
              ['Buy', '/properties?purpose=buy'],
              ['Rent', '/properties?purpose=rent'],
              ['About Us', '/about'],
              ['Contact', '/contact'],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Miami Areas</h3>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3.5 text-[15px] lg:grid-cols-1">
            {locations.slice(0, 6).map((loc) => (
              <li key={loc}>
                <Link to={`/properties?location=${encodeURIComponent(loc)}`} className="transition-colors hover:text-gold">
                  {loc}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Get in Touch</h3>
          <address className="mt-6 space-y-5 text-[15px] not-italic leading-relaxed">
            <a
              href={company.mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 transition-colors hover:text-gold"
            >
              <MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
              <span>
                Serving {company.serviceArea}
                <br />
                <span className="text-white/45">Find us on Google Maps</span>
              </span>
            </a>
            <a href={company.phoneHref} className="flex items-center gap-3 transition-colors hover:text-gold">
              <Phone size={18} className="shrink-0 text-gold" aria-hidden="true" />
              {company.phoneDisplay}
            </a>
            <a
              href={company.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-gold"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] shrink-0 text-gold" />
              Chat on WhatsApp
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-luxe flex flex-col gap-3 py-7 text-[12px] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Website concept preview. Property listings are illustrative samples and do not represent available
            inventory.
          </p>
        </div>
      </div>
    </footer>
  )
}
