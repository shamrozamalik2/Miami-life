import { KeyRound, MapPin, MessageCircle, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import StarRating from '../ui/StarRating'
import { company } from '../../data/company'

// Only verifiable statements: location, Google rating, services, direct contact.
const reasons = [
  {
    icon: MapPin,
    title: 'Based in Abu Dhabi',
    text: `Visit us at our office in ${company.address.area} on ${company.address.street} — local knowledge, face-to-face meetings.`,
  },
  {
    icon: Star,
    title: `Rated ${company.rating} on Google`,
    text: `${company.reviewCount} clients have shared their experience of working with us on our Google Business Profile.`,
  },
  {
    icon: KeyRound,
    title: 'Buying & renting under one roof',
    text: 'Whether you are purchasing a home, investing, or looking for an annual rental, we can help you with both.',
  },
  {
    icon: MessageCircle,
    title: 'Talk to us directly',
    text: 'Call or message our team on WhatsApp to discuss your requirements and arrange viewings at a time that suits you.',
  },
]

export default function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy py-24 sm:py-32">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="relative order-2 lg:order-1">
          <div className="absolute -top-6 -left-6 hidden h-full w-full border border-gold/30 sm:block" />
          <img
            src="/images/waterfront-towers.webp"
            alt="Waterfront residential towers and landscaped promenade in Abu Dhabi at sunset"
            loading="lazy"
            className="relative aspect-[4/5] w-full object-cover sm:aspect-[6/5]"
          />
          <div className="absolute right-0 -bottom-8 bg-gold p-7 text-navy sm:-right-8 sm:p-9">
            <p className="font-display text-6xl leading-none">{company.rating}</p>
            <StarRating rating={company.rating} size={14} className="mt-3 [&_.text-gold]:!text-navy [&_.fill-gold]:!fill-navy" />
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em]">{company.reviewCount} Google reviews</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            light
            eyebrow="Why Ultimate Properties"
            title={
              <>
                A local partner for your <em className="text-gold">next move</em>
              </>
            }
            intro="Finding the right property is about more than listings. It is about understanding what you need and having someone in Abu Dhabi you can rely on."
          />
          <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 100} className="bg-navy p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <Icon size={26} strokeWidth={1.2} className="text-gold" aria-hidden="true" />
                  <span className="font-display text-xl text-white/25">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl text-white">{title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
