import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { Phone } from 'lucide-react'
import Reveal from '../ui/Reveal'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import SplitText from '../motion/SplitText'
import Magnetic from '../motion/Magnetic'
import { company, whatsappLink } from '../../data/company'

/** Closing call-to-action: the panel opens out to full width as it scrolls in, over a parallax photo. */
export default function ContactCTA() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])
  const inset = useTransform(scrollYProgress, [0, 0.4], [6, 0])
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`)

  return (
    <section ref={ref} className="bg-ivory">
      <motion.div style={{ clipPath }} className="relative isolate overflow-hidden bg-navy">
        <motion.img
          src="/images/miami-south-beach-night.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{ y, scale: 1.35 }}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-navy/75" />

        <div className="container-luxe flex flex-col items-center py-32 text-center sm:py-44">
          <Reveal y={16}>
            <p className="eyebrow justify-center">Get in touch</p>
          </Reveal>
          <SplitText
            as="h2"
            className="mt-6 block max-w-4xl font-display text-5xl leading-[1.02] text-white sm:text-6xl lg:text-[88px]"
            parts={[
              { text: 'Let’s find your' },
              { text: 'next address', className: 'italic text-gold' },
              { text: 'in Miami' },
            ]}
          />
          <Reveal delay={300} y={20}>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/75">
              Tell us what you are looking for and our team will get back to you with suitable options.
            </p>
          </Reveal>
          <Reveal
            delay={450}
            y={20}
            className="mt-11 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Magnetic>
              <a
                href={whatsappLink('Hello Miami Life, I would like help finding a property in Miami.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
              </a>
            </Magnetic>
            <Magnetic>
              <a href={company.phoneHref} className="btn-outline-light w-full">
                <Phone size={16} /> {company.phoneDisplay}
              </a>
            </Magnetic>
            <Magnetic>
              <Link to="/contact" className="btn-outline-light w-full">
                Send an Enquiry
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}
