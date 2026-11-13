import { ArrowUpRight, Quote } from 'lucide-react'
import Reveal from '../ui/Reveal'
import StarRating from '../ui/StarRating'
import { company } from '../../data/company'

/**
 * Review summary built only from the verified Google rating and review count.
 * No testimonials are invented: the cards on the right are placeholders where
 * real Google reviews can be embedded (e.g. via the Places API) on launch.
 */
export default function Reviews() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-luxe grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow">Client Reviews</p>
          <h2 className="mt-5 font-display text-[40px] leading-[1.05] text-navy sm:text-5xl lg:text-[58px]">
            Trusted by clients <em className="text-gold-dark">on Google</em>
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
            Our rating comes directly from {company.reviewCount} reviews left by clients on the{' '}
            {company.name} Google Business Profile.
          </p>
          <a
            href={company.mapsSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-navy mt-8"
          >
            Read reviews on Google <ArrowUpRight size={16} />
          </a>
        </Reveal>

        <div className="grid content-center gap-5">
          {[0, 1, 2].map((i) => (
            <Reveal
              key={i}
              delay={i * 120}
              className={`relative border border-navy/10 bg-white p-7 sm:p-8 ${i === 1 ? 'lg:ml-12' : ''}`}
            >
              <Quote size={28} strokeWidth={1} className="text-gold" aria-hidden="true" />
              <div className="mt-5 space-y-2.5" aria-hidden="true">
                <div className="h-2.5 w-full rounded-full bg-sand" />
                <div className="h-2.5 w-11/12 rounded-full bg-sand" />
                <div className="h-2.5 w-2/3 rounded-full bg-sand" />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-sand" aria-hidden="true" />
                  <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Google review
                  </span>
                </div>
                <StarRating rating={5} size={13} />
              </div>
            </Reveal>
          ))}
          <p className="text-center text-[12px] text-muted/80 lg:ml-12">
            Preview: verified Google reviews will be displayed here automatically once the website is live.
          </p>
        </div>
      </div>
    </section>
  )
}
