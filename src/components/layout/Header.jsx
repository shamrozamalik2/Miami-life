import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Phone, X } from 'lucide-react'
import Logo from '../ui/Logo'
import WhatsAppIcon from '../ui/WhatsAppIcon'
import { company, whatsappLink } from '../../data/company'

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'Buy', to: '/properties?purpose=buy' },
  { label: 'Rent', to: '/properties?purpose=rent' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

/** Active-state check that also understands ?purpose= links. */
function useIsActive() {
  const { pathname, search } = useLocation()
  const purpose = new URLSearchParams(search).get('purpose')
  return (to) => {
    const [path, query] = to.split('?')
    if (query) return pathname === path && purpose === new URLSearchParams(query).get('purpose')
    if (path === '/properties') return pathname.startsWith('/properties') && !purpose
    return pathname === path
  }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isActive = useIsActive()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [location.pathname, location.search])

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Concept-preview notice */}
      <div
        className={`overflow-hidden bg-gold text-navy transition-all duration-500 ease-luxe ${
          scrolled ? 'max-h-0' : 'max-h-12'
        }`}
      >
        <p className="container-luxe py-2 text-center text-[10.5px] font-semibold uppercase tracking-[0.18em] sm:text-[11px]">
          Website concept preview · Property listings shown are samples for demonstration
        </p>
      </div>

      <div
        className={`transition-all duration-500 ease-luxe ${
          scrolled ? 'bg-navy/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div
          className={`container-luxe flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-[76px]' : 'h-[92px]'
          }`}
        >
          <Logo />

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={`link-underline text-[12px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 hover:text-gold ${
                      isActive(item.to) ? 'text-gold' : 'text-white/85'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={company.phoneHref}
              className="flex items-center gap-2 text-[13px] font-medium tracking-wide text-white/85 transition-colors hover:text-gold xl:text-sm"
            >
              <Phone size={15} className="text-gold" aria-hidden="true" />
              <span className="hidden xl:inline">{company.phoneDisplay}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <a
              href={whatsappLink('Hello Miami Life, I would like to enquire about a property.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold !px-5 !py-3"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={company.phoneHref}
              aria-label={`Call ${company.phoneDisplay}`}
              className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-gold"
            >
              <Phone size={20} />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center text-white"
            >
              <Menu size={26} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-navy transition-all duration-500 ease-luxe lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="container-luxe flex h-[92px] items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center text-white"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="container-luxe flex-1 overflow-y-auto pt-6">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li
                key={item.label}
                className={`transition-all duration-700 ease-luxe ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
              >
                <Link
                  to={item.to}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-baseline justify-between border-b border-white/10 py-4 font-display text-4xl ${
                    isActive(item.to) ? 'text-gold' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span className="font-sans text-[11px] tracking-[0.2em] text-white/30">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="container-luxe grid grid-cols-2 gap-3 pt-6 pb-8">
          <a href={company.phoneHref} tabIndex={open ? 0 : -1} className="btn-outline-light !px-4">
            <Phone size={16} /> Call
          </a>
          <a
            href={whatsappLink('Hello Miami Life, I would like to enquire about a property.')}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="btn-gold !px-4"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}
