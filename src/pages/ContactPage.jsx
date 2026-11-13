import { ArrowUpRight, Clock, MapPin, Navigation, Phone } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'
import InquiryForm from '../components/property/InquiryForm'
import { company, whatsappLink } from '../data/company'

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: 'Call us',
      value: company.phoneDisplay,
      href: company.phoneHref,
      action: 'Tap to call',
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: company.phoneDisplay,
      href: whatsappLink('Hello Ultimate Properties, I would like to enquire about a property.'),
      action: 'Start a chat',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Visit our office',
      value: `${company.address.office}, ${company.address.building}`,
      href: company.mapsSearchUrl,
      action: 'Get directions',
      external: true,
    },
  ]

  return (
    <>
      <Seo
        title="Contact Us — Real Estate Agent in Al Danah, Abu Dhabi"
        description="Contact Ultimate Properties LLC: call or WhatsApp +971 50 265 6531, or visit Office 302, Rejlers Abu Dhabi, Hamdan Bin Mohammed Street, Al Danah, Abu Dhabi."
      />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s talk about <em className="text-gold">your next property</em>
          </>
        }
        intro="Call, message us on WhatsApp, or send an enquiry below. You are also welcome to visit our office in Al Danah."
        image="/images/interior-skyline-living.webp"
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="relative z-10 -mt-12">
        <div className="container-luxe grid gap-px bg-navy/10 shadow-[0_30px_60px_-35px_rgba(16,28,44,0.4)] md:grid-cols-3">
          {channels.map(({ icon: Icon, label, value, href, action, external }, i) => (
            <Reveal key={label} delay={i * 100} className="bg-white">
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-navy sm:p-10"
              >
                <Icon size={26} strokeWidth={1.3} className="h-[26px] w-[26px] text-gold" />
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted transition-colors group-hover:text-white/50">
                  {label}
                </p>
                <p className="mt-2 font-display text-2xl text-navy transition-colors group-hover:text-white">{value}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-dark transition-colors group-hover:text-gold">
                  {action} <ArrowUpRight size={14} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Send an enquiry</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] text-navy sm:text-5xl">
              How can we <em className="text-gold-dark">help?</em>
            </h2>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-muted">
              Tell us a little about what you are looking for and a member of our team will get back to you.
            </p>
            <div className="mt-10">
              <InquiryForm />
            </div>
          </Reveal>

          <Reveal delay={150} className="flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-auto lg:flex-1">
              <iframe
                title="Map showing Ultimate Properties LLC office location in Al Danah, Abu Dhabi"
                src={company.mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="bg-navy p-8 text-white/75 sm:p-10">
              <h3 className="font-display text-3xl text-white">Our office</h3>
              <address className="mt-5 flex gap-3 text-[15px] not-italic leading-relaxed">
                <MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {company.name}
                  <br />
                  {company.address.building}, {company.address.office}
                  <br />
                  {company.address.street}
                  <br />
                  {company.address.area}, {company.address.city}
                  <br />
                  {company.address.country}
                </span>
              </address>
              <p className="mt-4 flex gap-3 text-[14px] text-white/55">
                <Clock size={17} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                Please call ahead to arrange a meeting at the office.
              </p>
              <a
                href={company.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-8 w-full sm:w-auto"
              >
                <Navigation size={15} /> Open in Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
