import WhatsAppIcon from '../ui/WhatsAppIcon'
import { whatsappLink } from '../../data/company'

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink('Hello Ultimate Properties, I found you through your website and would like some help.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ultimate Properties on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-3 sm:right-8 sm:bottom-8"
    >
      <span className="pointer-events-none hidden translate-x-2 bg-navy px-4 py-2.5 text-[12px] font-semibold tracking-wide whitespace-nowrap text-white opacity-0 shadow-xl transition-all duration-500 ease-luxe group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-500 ease-luxe group-hover:scale-105 sm:h-16 sm:w-16">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.5s]" />
        <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
      </span>
    </a>
  )
}
