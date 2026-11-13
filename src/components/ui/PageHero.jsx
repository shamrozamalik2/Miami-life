import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/** Banner used at the top of inner pages, with breadcrumb. */
export default function PageHero({ eyebrow, title, intro, image, crumbs = [] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy pt-36 pb-20 sm:pt-44 sm:pb-28">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full animate-slow-zoom object-cover opacity-40"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" />
        </>
      )}
      <div className="container-luxe">
        <nav aria-label="Breadcrumb" className="mb-8 animate-fade-in">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            <li>
              <Link to="/" className="hover:text-gold">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <ChevronRight size={12} aria-hidden="true" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold" aria-current="page">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow animate-fade-up">{eyebrow}</p>}
        <h1 className="mt-5 max-w-3xl animate-fade-up font-display text-5xl font-normal leading-[1.02] text-white [animation-delay:120ms] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-xl animate-fade-up text-[16px] leading-relaxed text-white/70 [animation-delay:240ms]">
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
