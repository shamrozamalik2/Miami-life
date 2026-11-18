import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

/** Counts from 0 to `to` when scrolled into view. Keeps the decimals of the target ("5.0"). */
export default function CountUp({ to, duration = 1.8, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const target = Number(to)
  const decimals = String(to).includes('.') ? String(to).split('.')[1].length : 0
  const [value, setValue] = useState((0).toFixed(decimals))

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, target, decimals, duration])

  return (
    <span ref={ref} className={`relative ${className}`}>
      <span className="sr-only">{to}</span>
      <span aria-hidden="true">{value}</span>
    </span>
  )
}
