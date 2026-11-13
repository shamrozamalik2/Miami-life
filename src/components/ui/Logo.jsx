import { Link } from 'react-router-dom'

/** Text logo: ULTIMATE / gold rule / PROPERTIES */
export default function Logo({ light = true, className = '' }) {
  return (
    <Link
      to="/"
      aria-label="Ultimate Properties — home"
      className={`group inline-flex flex-col items-start leading-none ${className}`}
    >
      <span
        className={`font-display text-[26px] font-medium tracking-[0.28em] transition-colors duration-500 sm:text-[28px] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        ULTIMATE
      </span>
      <span className="mt-1.5 flex w-full items-center gap-2">
        <span className="h-px flex-1 bg-gold transition-all duration-700 ease-luxe group-hover:flex-[2]" />
        <span className="text-[9.5px] font-semibold tracking-[0.42em] text-gold">PROPERTIES</span>
        <span className="h-px flex-1 bg-gold transition-all duration-700 ease-luxe group-hover:flex-[2]" />
      </span>
    </Link>
  )
}
