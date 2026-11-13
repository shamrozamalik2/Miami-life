import { Star } from 'lucide-react'

/** Renders 5 stars with partial fill for fractional ratings (e.g. 4.8). */
export default function StarRating({ rating, size = 18, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`} role="img" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star size={size} strokeWidth={1.2} className="absolute inset-0 text-gold/40" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} strokeWidth={1.2} className="fill-gold text-gold" />
            </span>
          </span>
        )
      })}
    </div>
  )
}
