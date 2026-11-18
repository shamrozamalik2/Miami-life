import { ArrowUpRight, Quote } from 'lucide-react'
import Reveal from '../ui/Reveal'
import StarRating from '../ui/StarRating'
import { company, reviews } from '../../data/company'

/**
 * Review summary from the Google Business Profile, plus verbatim excerpts of
 * public Google reviews (see `reviews` in data/company.js). Nothing here is invented.
 */
export default function Reviews() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-luxe grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Client Reviews</p>
          <h2 className="mt-5 font-display text-[40px] leading-[1.05] text-navy sm:text-5xl lg:text-[58px]">
            What clients say <em className="text-gold-dark">on Google</em>
          </h2>

          <div className="mt-12 flex items-end gap-6 border-b border-navy/10 pb-10">
            <span className="font-display text-[120px] leading-[0.8] text-navy sm:text-[150px]">{company.rating}</span>
            <div className="pb-2">
              <StarRating rating={company.rating} size={22} />
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-muted">
                out of 5 · {company.reviewCount} reviews
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-md text-[15.5px] leading-relaxed text-muted">
            Our rating comes directly from {company.reviewCount} reviews left by clients on the {company.name} Google
            Business Profile.
          </p>
          <a href={company.mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-navy mt-8">
            Read all reviews on Google <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="grid content-center gap-5">
          {reviews.map((r, i) => (
            <Reveal
              as="figure"
              key={r.author}
              delay={i * 120}
              className={`relative border border-navy/10 bg-white p-7 sm:p-8 ${i === 1 ? 'lg:ml-12' : ''}`}
            >
              <Quote size={28} strokeWidth={1} className="text-gold" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-[21px] leading-snug text-navy sm:text-[23px]">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-sand text-[13px] font-semibold text-navy"
                  aria-hidden="true"
                >
                  {r.author.charAt(0)}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-navy">{r.author}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Google review</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
