import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Car,
  Check,
  ChevronRight,
  Clapperboard,
  Dumbbell,
  Eye,
  Fence,
  Home,
  Info,
  MapPin,
  Maximize,
  Phone,
  ShieldCheck,
  Sofa,
  Sparkles,
  Sun,
  Trees,
  Waves,
} from 'lucide-react'
import Seo from '../components/ui/Seo'
import Reveal from '../components/ui/Reveal'
import SampleBadge from '../components/ui/SampleBadge'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import Gallery from '../components/property/Gallery'
import InquiryForm from '../components/property/InquiryForm'
import PropertyCard from '../components/property/PropertyCard'
import { getPropertyBySlug, properties } from '../data/properties'
import { company, whatsappLink } from '../data/company'
import { formatArea, formatPrice, placeName } from '../utils/format'
import NotFoundPage from './NotFoundPage'

const amenityIcon = (name) => {
  const n = name.toLowerCase()
  if (n.includes('pool') || n.includes('beach')) return Waves
  if (n.includes('sea view') || n.includes('view')) return Eye
  if (n.includes('gym') || n.includes('padel')) return Dumbbell
  if (n.includes('parking') || n.includes('garage')) return Car
  if (n.includes('garden') || n.includes('park') || n.includes('yard')) return Trees
  if (n.includes('security') || n.includes('doorman') || n.includes('windows')) return ShieldCheck
  if (n.includes('terrace') || n.includes('balcony')) return Sun
  if (n.includes('elevator')) return Building2
  if (n.includes('cinema') || n.includes('media')) return Clapperboard
  if (n.includes('office') || n.includes('study')) return Sofa
  if (n.includes('smart') || n.includes('concierge')) return Sparkles
  if (n.includes('room') || n.includes('wardrobe')) return Home
  if (n.includes('play')) return Fence
  return Check
}

export default function PropertyDetailsPage() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)

  if (!property) return <NotFoundPage message="This property could not be found. It may have been removed." />

  const {
    id,
    title,
    purpose,
    type,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
    description,
    amenities,
    tagline,
  } = property

  const similar = properties
    .filter((p) => p.id !== id && (p.purpose === purpose || p.location === location))
    .slice(0, 3)

  const facts = [
    { icon: BedDouble, label: 'Bedrooms', value: bedrooms },
    { icon: Bath, label: 'Bathrooms', value: bathrooms },
    { icon: Maximize, label: 'Area (sq ft)', value: area.toLocaleString('en-US') },
    { icon: Building2, label: 'Property type', value: type },
  ]

  const waMessage = `Hello, I'm interested in ${title} in ${location} (ref ${id}). Could you share more details?`
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(`${placeName(location)}, FL`)}&z=13&output=embed`

  return (
    <>
      <Seo
        title={`${title} — ${placeName(location)}`}
        description={`${type} ${purpose === 'buy' ? 'for sale' : 'for rent'} in ${placeName(location)}: ${bedrooms} bedrooms, ${bathrooms} bathrooms, ${formatArea(
          area,
        )}. ${formatPrice(price, purpose)}. Sample listing by Real Estate Miami Life.`}
        image={images[0].src}
        type="article"
      />

      {/* Header band */}
      <section className="bg-navy pt-36 pb-12 sm:pt-40">
        <div className="container-luxe">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
              <li>
                <Link to="/" className="hover:text-gold">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight size={12} aria-hidden="true" />
                <Link to="/properties" className="hover:text-gold">
                  Properties
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight size={12} aria-hidden="true" />
                <Link to={`/properties?location=${encodeURIComponent(location)}`} className="hover:text-gold">
                  {location}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
                    purpose === 'buy' ? 'bg-gold text-navy' : 'bg-white text-navy'
                  }`}
                >
                  {purpose === 'buy' ? 'For Sale' : 'For Rent'}
                </span>
                <SampleBadge />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">Ref {id}</span>
              </div>
              <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-4 flex items-center gap-2 text-[15px] text-white/70">
                <MapPin size={16} className="text-gold" aria-hidden="true" />
                {placeName(location)}
              </p>
            </div>
            <div className="animate-fade-up [animation-delay:150ms] lg:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
                {purpose === 'buy' ? 'Asking price' : 'Monthly rent'}
              </p>
              <p className="mt-2 font-display text-4xl text-gold sm:text-5xl">{formatPrice(price, purpose)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-24 sm:pb-32">
        <div className="container-luxe">
          <div className="animate-fade-up [animation-delay:250ms]">
            <Gallery images={images} title={title} />
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_400px] xl:gap-20">
            <div className="min-w-0">
              {/* Key facts */}
              <ul className="grid grid-cols-2 gap-px bg-navy/10 sm:grid-cols-4">
                {facts.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="bg-white p-5 sm:p-6">
                    <Icon size={22} strokeWidth={1.3} className="text-gold" aria-hidden="true" />
                    <p className="mt-4 font-display text-3xl leading-none text-navy">{value}</p>
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">{label}</p>
                  </li>
                ))}
              </ul>

              <Reveal className="mt-14">
                <p className="eyebrow">About this property</p>
                <h2 className="mt-4 font-display text-4xl text-navy">{tagline}</h2>
                <div className="mt-6 space-y-5 text-[16px] leading-[1.8] text-ink/80">
                  {description.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>
              </Reveal>

              <Reveal className="mt-14">
                <p className="eyebrow">Amenities & features</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {amenities.map((a) => {
                    const Icon = amenityIcon(a)
                    return (
                      <li
                        key={a}
                        className="flex items-center gap-4 border border-navy/10 bg-white px-5 py-4 text-[15px]"
                      >
                        <Icon size={19} strokeWidth={1.4} className="shrink-0 text-gold" aria-hidden="true" />
                        {a}
                      </li>
                    )
                  })}
                </ul>
              </Reveal>

              <Reveal className="mt-14">
                <p className="eyebrow">Location</p>
                <h2 className="mt-4 font-display text-3xl text-navy">{placeName(location)}</h2>
                <div className="mt-6 aspect-[16/9] overflow-hidden bg-sand">
                  <iframe
                    title={`Map of ${placeName(location)}`}
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0 grayscale-[30%]"
                  />
                </div>
                <p className="mt-3 text-[12px] text-muted">Map shows the general neighborhood, not an exact address.</p>
              </Reveal>

              <div className="mt-14 flex items-start gap-3 border-l-2 border-gold bg-white px-5 py-4 text-[13.5px] leading-relaxed text-ink/80">
                <Info size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <p>
                  <strong className="font-semibold text-navy">Sample listing.</strong> This property, its price and
                  specifications are illustrative and were created to demonstrate the website. It is not an offer and is
                  not available for sale or rent.
                </p>
              </div>
            </div>

            {/* Enquiry sidebar */}
            <aside aria-label="Enquire about this property">
              <div className="sticky top-28 bg-navy p-7 sm:p-9">
                <p className="eyebrow">Enquire</p>
                <h2 className="mt-4 font-display text-3xl text-white">Interested in this property?</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">
                  Send an enquiry or message us on WhatsApp for details and viewings.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <a
                    href={whatsappLink(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold !px-3"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={company.phoneHref} className="btn-outline-light !px-3">
                    <Phone size={15} /> Call
                  </a>
                </div>
                <div className="my-7 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  <span className="h-px flex-1 bg-white/10" /> or send a message{' '}
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <InquiryForm property={property} dark compact />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-sand py-24">
          <div className="container-luxe">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">You may also like</p>
                <h2 className="mt-4 font-display text-4xl text-navy sm:text-5xl">Similar properties</h2>
              </div>
              <Link to="/properties" className="btn-outline-dark">
                <ArrowLeft size={16} /> All properties
              </Link>
            </div>
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
