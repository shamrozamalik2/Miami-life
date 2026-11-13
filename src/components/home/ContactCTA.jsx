import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'
import Reveal from '../ui/Reveal'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import { company, whatsappLink } from '../../data/company'

export default function ContactCTA() {
  return (
    <section className="bg-ivory px-0 py-0 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
      <div className="relative isolate overflow-hidden bg-navy">
        <img
          src="/images/interior-skyline-living.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/75" />

        <Reveal className="container-luxe flex flex-col items-center py-28 text-center sm:py-36">
          <p className="eyebrow justify-center">Get in touch</p>
          <h2 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Let’s find your <em className="text-gold">next address</em> in Abu Dhabi
          </h2>
          <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
            Tell us what you are looking for and our team will get back to you with suitable options.
          </p>
          <div className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a
              href={whatsappLink('Hello Ultimate Properties, I would like help finding a property in Abu Dhabi.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
            <a href={company.phoneHref} className="btn-outline-light">
              <Phone size={16} /> {company.phoneDisplay}
            </a>
            <Link to="/contact" className="btn-outline-light">
              Send an Enquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
