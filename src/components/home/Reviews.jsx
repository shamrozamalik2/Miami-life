import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import StarRating from '../ui/StarRating'
import SplitText from '../motion/SplitText'
import CountUp from '../motion/CountUp'
import Magnetic from '../motion/Magnetic'
import useGoogleReviews from '../../hooks/useGoogleReviews'
import { company } from '../../data/company'

function GoogleG({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}

// Three looks that alternate along the loop for visual rhythm
const variants = {
  light: {
    card: 'bg-white text-navy border border-navy/10',
    quoteMark: 'text-gold/15',
    muted: 'text-muted',
    rule: 'border-navy/10',
    chip: 'bg-ivory text-navy',
    avatar: 'bg-sand text-navy ring-gold/40',
    link: 'text-gold-dark',
  },
  dark: {
    card: 'bg-navy text-white border border-white/5',
    quoteMark: 'text-gold/25',
    muted: 'text-white/50',
    rule: 'border-white/10',
    chip: 'bg-white/10 text-white',
    avatar: 'bg-white/10 text-white ring-gold/60',
    link: 'text-gold',
  },
  accent: {
    card: 'bg-gold text-navy border border-gold',
    quoteMark: 'text-navy/10',
    muted: 'text-navy/60',
    rule: 'border-navy/15',
    chip: 'bg-navy/10 text-navy',
    avatar: 'bg-navy text-gold ring-navy/30',
    link: 'text-navy',
  },
}
const pattern = ['light', 'dark', 'light', 'accent']

function ReviewCard({ review, hidden, variant = 'light', googleUrl }) {
  const { author, authorUrl, photo, rating, text, when } = review
  const v = variants[variant]
  const tab = hidden ? -1 : undefined

  return (
    <figure
      aria-hidden={hidden || undefined}
      className={`group/card relative flex w-[310px] shrink-0 flex-col overflow-hidden p-8 transition-all duration-700 ease-luxe hover:-translate-y-2 hover:shadow-[0_40px_70px_-35px_rgba(14,14,16,0.55)] sm:w-[420px] sm:p-10 ${v.card}`}
    >
      {/* oversized decorative quote mark */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-2 right-6 font-display text-[180px] leading-[0.8] transition-transform duration-1000 ease-luxe select-none group-hover/card:-translate-x-3 group-hover/card:translate-y-2 ${v.quoteMark}`}
      >
        ”
      </span>

      <div className="relative flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] ${v.chip}`}
        >
          <GoogleG className="h-3.5 w-3.5" /> Google review
        </span>
        {rating ? <StarRating rating={rating} size={14} /> : null}
      </div>

      <blockquote className="relative mt-8 line-clamp-7 flex-1 font-display text-[22px] leading-[1.28] sm:text-[25px]">
        {text}
      </blockquote>

      <figcaption className={`relative mt-8 flex items-center justify-between gap-4 border-t pt-6 ${v.rule}`}>
        <span className="flex min-w-0 items-center gap-3.5">
          {photo ? (
            <img
              src={photo}
              alt=""
              referrerPolicy="no-referrer"
              loading="lazy"
              className={`h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-offset-2 ring-offset-transparent ${v.avatar}`}
            />
          ) : (
            <span
              aria-hidden="true"
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-[22px] ring-1 ring-offset-4 ring-offset-transparent ${v.avatar}`}
            >
              {author.charAt(0)}
            </span>
          )}
          <span className="min-w-0">
            {authorUrl ? (
              <a
                href={authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={tab}
                className="block truncate text-[15px] font-semibold hover:underline"
              >
                {author}
              </a>
            ) : (
              <span className="block truncate text-[15px] font-semibold">{author}</span>
            )}
            <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${v.muted}`}>
              {when || 'Posted on Google'}
            </span>
          </span>
        </span>
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={tab}
          aria-label={`Read ${author}’s full review on Google`}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-500 group-hover/card:rotate-45 ${v.rule} ${v.link}`}
        >
          <ArrowUpRight size={16} />
        </a>
      </figcaption>
    </figure>
  )
}

/** Google review summary + an endless, hover-pausable loop of review cards. */
export default function Reviews() {
  const { rating, count, url, reviews } = useGoogleReviews()

  // Repeat the set until the strip is wide enough, then render it twice for a seamless -50% loop
  const loop = []
  while (loop.length < 8 || loop.length % pattern.length !== 0) loop.push(...reviews)
  const seconds = loop.length * 7

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="container-luxe flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal y={16}>
            <p className="eyebrow">Client Reviews</p>
          </Reveal>
          <SplitText
            as="h2"
            className="mt-5 block font-display text-[44px] leading-[1.02] text-navy sm:text-6xl lg:text-[72px]"
            parts={[{ text: 'What clients say' }, { text: 'on Google', className: 'italic text-gold-dark' }]}
          />
        </div>

        <Reveal delay={150} className="flex flex-wrap items-center gap-6 sm:gap-8">
          <div className="flex items-center gap-5">
            <span className="font-display text-[88px] leading-[0.8] text-navy">
              <CountUp to={rating} />
            </span>
            <div>
              <StarRating rating={rating} size={18} />
              <p className="mt-2 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                <GoogleG className="h-3.5 w-3.5" /> {count} reviews
              </p>
            </div>
          </div>
          <Magnetic>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-navy">
              Read all on Google <ArrowUpRight size={16} />
            </a>
          </Magnetic>
        </Reveal>
      </div>

      {/* Infinite loop — pauses on hover; edges fade out */}
      <div
        className="group mt-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-x-auto"
        aria-label={`Reviews from Google for ${company.name}`}
        role="region"
      >
        <div
          className="flex w-max animate-marquee items-stretch gap-6 py-6 pr-6 group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${seconds}s` }}
        >
          {[...loop, ...loop].map((r, i) => (
            <ReviewCard
              key={i}
              review={r}
              hidden={i >= reviews.length}
              variant={pattern[(i % loop.length) % pattern.length]}
              googleUrl={url}
            />
          ))}
        </div>
      </div>

      <p className="container-luxe mt-8 flex items-center gap-2 text-[12px] text-muted">
        <GoogleG className="h-3.5 w-3.5" /> Reviews from Google
      </p>
    </section>
  )
}
