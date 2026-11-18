import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useScrollLock } from '../motion/SmoothScroll'

/** Large property gallery with thumbnails, keyboard navigation and full-screen lightbox. */
export default function Gallery({ images, title }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const count = images.length

  const go = useCallback((dir) => setIndex((i) => (i + dir + count) % count), [count])
  useScrollLock(lightbox)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, go])

  const current = images[index]

  return (
    <div>
      <div className="group relative aspect-[16/10] overflow-hidden bg-navy sm:aspect-[16/9]">
        {images.map((img, i) => (
          <img
            key={img.src + i}
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-luxe ${
              i === index ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/60 to-transparent" />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 text-navy transition-all hover:bg-gold sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 text-navy transition-all hover:bg-gold sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-white">
          <span className="text-[12px] font-semibold tracking-[0.2em]">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="flex items-center gap-2 bg-navy/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur transition-colors hover:bg-gold hover:text-navy"
          >
            <Expand size={14} /> Full screen
          </button>
        </div>
      </div>

      {count > 1 && (
        <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={img.src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}: ${img.alt}`}
              aria-current={i === index}
              className={`relative aspect-[4/3] w-24 shrink-0 overflow-hidden transition-all duration-500 sm:w-32 ${
                i === index ? 'ring-2 ring-gold ring-offset-2 ring-offset-ivory' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — image gallery`}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/97 p-4"
            onClick={() => setLightbox(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close gallery"
              className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center text-white hover:text-gold"
              autoFocus
            >
              <X size={28} />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={current.src + index}
                src={current.src}
                alt={current.alt}
                className="max-h-[85vh] max-w-full object-contain"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(-1)
                  }}
                  aria-label="Previous image"
                  className="absolute left-3 flex h-12 w-12 items-center justify-center text-white hover:text-gold sm:left-8"
                >
                  <ChevronLeft size={32} strokeWidth={1.2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(1)
                  }}
                  aria-label="Next image"
                  className="absolute right-3 flex h-12 w-12 items-center justify-center text-white hover:text-gold sm:right-8"
                >
                  <ChevronRight size={32} strokeWidth={1.2} />
                </button>
              </>
            )}
            <p className="absolute bottom-6 left-1/2 w-[90%] -translate-x-1/2 text-center text-[13px] text-white/60">
              {current.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
