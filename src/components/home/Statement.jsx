import { motion } from 'motion/react'
import { Phone } from 'lucide-react'
import ScrollHighlightText from '../motion/ScrollHighlightText'
import RevealImage from '../motion/RevealImage'
import Marquee from '../motion/Marquee'
import Magnetic from '../motion/Magnetic'
import CountUp from '../motion/CountUp'
import Reveal from '../ui/Reveal'
import StarRating from '../ui/StarRating'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import { easeLuxe } from '../motion/ease'
import { locations } from '../../data/properties'
import { company, whatsappLink } from '../../data/company'

/** "Our approach": agent portrait beside a statement that lights up as you scroll, then a neighborhood ticker. */
export default function Statement() {
  return (
    <section className="overflow-hidden bg-ivory pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="container-luxe grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-[460px] lg:mx-0">
          {/* offset coral frame */}
          <motion.div
            aria-hidden="true"
            className="absolute -top-5 -left-5 h-full w-full border border-gold sm:-top-7 sm:-left-7"
            initial={{ opacity: 0, x: 24, y: 24 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.2, ease: easeLuxe, delay: 0.5 }}
          />
          <RevealImage
            src="/images/agent-portrait.webp"
            alt="Real Estate Miami Life agent smiling, with the Miami skyline and Biscayne Bay behind"
            className="aspect-[4/5] w-full"
            parallax={6}
          />

          {/* rating badge */}
          <motion.a
            href={company.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -right-3 bottom-10 flex items-center gap-4 bg-navy px-5 py-4 text-white shadow-[0_25px_50px_-20px_rgba(14,14,16,0.6)] sm:-right-10 sm:px-6 sm:py-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1, ease: easeLuxe, delay: 0.9 }}
          >
            <span className="font-display text-5xl leading-none">
              <CountUp to={company.rating} />
            </span>
            <span>
              <StarRating rating={company.rating} size={13} />
              <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                {company.reviewCount} Google reviews
              </span>
            </span>
          </motion.a>
        </div>

        {/* Statement */}
        <div>
          <Reveal y={16}>
            <p className="eyebrow">Our approach</p>
          </Reveal>
          <ScrollHighlightText
            className="mt-7 font-display text-[32px] leading-[1.15] text-navy sm:text-[42px] lg:text-[48px] lg:leading-[1.1]"
            accent={['Brickell', 'Downtown', 'Miami', 'interests']}
            text="Whether you are buying your first condo in Brickell, renting in Downtown or relocating to Miami from out of state — we help you understand the market, the neighborhoods and your options, and we look out for your interests from the first call to the keys."
          />

          <Reveal delay={150} className="mt-12 grid grid-cols-3 border-y border-navy/10">
            {[
              [company.rating, 'Google rating'],
              [String(company.reviewCount), 'Client reviews'],
              ['Buy · Rent', '& relocate'],
            ].map(([value, label], i) => (
              <div key={label} className={`py-6 ${i ? 'border-l border-navy/10 pl-5 sm:pl-8' : 'pr-5'}`}>
                <p className="font-display text-[26px] leading-none whitespace-nowrap text-navy sm:text-4xl">
                  {i < 2 ? <CountUp to={value} /> : value}
                </p>
                <p className="mt-2 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={250} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Magnetic>
              <a
                href={whatsappLink('Hello Miami Life, I would like to talk about buying or renting in Miami.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navy w-full sm:w-auto"
              >
                <WhatsAppIcon className="h-4 w-4" /> Talk to us
              </a>
            </Magnetic>
            <Magnetic>
              <a href={company.phoneHref} className="btn-outline-dark w-full sm:w-auto">
                <Phone size={15} /> {company.phoneDisplay}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      <Marquee items={locations} className="mt-24 border-y border-navy/10 py-8 text-navy sm:mt-32" speed={45} />
    </section>
  )
}
