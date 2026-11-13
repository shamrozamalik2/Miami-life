import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', light = false, className = '' }) {
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-5 font-display text-[40px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-5xl lg:text-[58px] ${
          light ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-[16px] leading-relaxed ${light ? 'text-white/70' : 'text-muted'}`}>{intro}</p>
      )}
    </Reveal>
  )
}
