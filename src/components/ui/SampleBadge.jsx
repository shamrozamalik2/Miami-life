/** Clearly marks illustrative listing content. */
export default function SampleBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center bg-white/90 px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-[0.18em] text-navy backdrop-blur ${className}`}
    >
      Sample listing
    </span>
  )
}
