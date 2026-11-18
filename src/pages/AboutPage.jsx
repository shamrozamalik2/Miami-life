import { Link } from 'react-router-dom'
import { ArrowRight, Handshake, KeyRound, Search, Users } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import StarRating from '../components/ui/StarRating'
import ContactCTA from '../components/home/ContactCTA'
import { company } from '../data/company'

const services = [
  {
    icon: Search,
    title: 'Property search',
    text: 'Share your requirements — neighborhood, budget, size and move-in date — and we will help you shortlist suitable homes.',
  },
  {
    icon: KeyRound,
    title: 'Sales',
    text: 'Support for buyers looking for a home or an investment, from first viewing through to closing.',
  },
  {
    icon: Handshake,
    title: 'Leasing',
    text: 'Help finding the right rental and guidance through the lease process for condos, homes and townhouses.',
  },
  {
    icon: Users,
    title: 'Landlords & sellers',
    text: 'Considering selling or renting out your property? Talk to us about presenting it to the right audience.',
  },
]

const steps = [
  ['Tell us what you need', 'Call, WhatsApp or send an enquiry with your preferred areas, budget and timeline.'],
  ['Review your shortlist', 'We share options that match your brief so you can focus on the homes that suit you.'],
  ['View with confidence', 'Arrange viewings at convenient times and ask questions along the way.'],
  ['Move forward', 'When you find the right property, we guide you through the next steps.'],
]

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About Us — Miami Real Estate Agent"
        description="Real Estate Miami Life helps clients buy, rent and relocate in Miami — Brickell, Downtown, Miami Beach and beyond. Rated 5.0 on Google from 23 reviews."
      />
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Your property partner <em className="text-gold">in Miami</em>
          </>
        }
        intro={`${company.name} helps clients buy, rent and relocate across Miami — from Brickell and Downtown to the beaches and beyond.`}
        image="/images/miami-beach-aerial.webp"
        crumbs={[{ label: 'About' }]}
      />

      <section className="py-24 sm:py-32">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  Helping people find <em className="text-gold-dark">the right home</em>
                </>
              }
            />
            <Reveal className="mt-8 space-y-5 text-[16px] leading-[1.8] text-ink/80">
              <p>
                Buying or renting a home is one of the most important decisions you will make. At {company.name}, our
                focus is simple: understand what you are looking for, and help you find a property that fits — whether
                that is a city apartment, a family villa or an investment.
              </p>
              <p>
                Many of our clients are new to the city — relocating for work or moving from out of state — and want
                someone who knows the neighborhoods and the rental market. Call or message us any time to talk it
                through.
              </p>
            </Reveal>
            <Reveal className="mt-10 flex flex-wrap items-center gap-6 border-t border-navy/10 pt-8">
              <span className="font-display text-6xl leading-none text-navy">{company.rating}</span>
              <div>
                <StarRating rating={company.rating} size={18} />
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-muted">
                  {company.reviewCount} reviews on Google
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative">
            <img
              src="/images/villa-poolside-living.webp"
              alt="Bright living room opening onto a pool terrace"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
            <div
              className="absolute -bottom-6 -left-6 hidden h-40 w-40 border border-gold sm:block"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand py-24 sm:py-32">
        <div className="container-luxe">
          <SectionHeading
            align="center"
            eyebrow="What we do"
            title={
              <>
                How we can <em className="text-gold-dark">help you</em>
              </>
            }
          />
          <ul className="mt-16 grid gap-px bg-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 100} className="bg-ivory p-8 sm:p-10">
                <Icon size={30} strokeWidth={1.1} className="text-gold" aria-hidden="true" />
                <h3 className="mt-7 font-display text-3xl text-navy">{title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <SectionHeading
            eyebrow="Working with us"
            title={
              <>
                A clear, <em className="text-gold-dark">simple process</em>
              </>
            }
            intro="However you prefer to get in touch, here is what you can expect when you start your property search with us."
          />
          <ol className="border-t border-navy/10">
            {steps.map(([title, text], i) => (
              <Reveal
                as="li"
                key={title}
                delay={i * 80}
                className="grid grid-cols-[60px_1fr] gap-4 border-b border-navy/10 py-8 sm:grid-cols-[90px_1fr]"
              >
                <span className="font-display text-4xl text-gold sm:text-5xl">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-navy sm:text-3xl">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
        <div className="container-luxe mt-16 flex justify-center">
          <Link to="/properties" className="btn-navy">
            Browse properties <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
