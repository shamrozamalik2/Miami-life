import { Link } from 'react-router-dom'

/** Text logo: MIAMI LIFE / gold rule / REAL ESTATE */
export default function Logo({ light = true, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Real Estate Miami Life — home"
      className={`group inline-flex flex-col items-start leading-none ${className}`}
    >
      <span
        className={`font-display text-[27px] font-normal tracking-[0.2em] whitespace-nowrap transition-colors duration-500 sm:text-[27px] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        MIAMI <em className="font-normal text-gold">LIFE</em>
      </span>
      <span className="mt-1.5 flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-gold transition-all duration-700 ease-luxe group-hover:flex-[2]" />
        <span className="text-[9.5px] font-semibold tracking-[0.42em] text-gold">REAL ESTATE</span>
        <span className="h-px flex-1 bg-gold transition-all duration-700 ease-luxe group-hover:flex-[2]" />
      </span>
    </Link>
  )
}
