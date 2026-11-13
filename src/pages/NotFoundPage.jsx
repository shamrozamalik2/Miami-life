import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '../components/ui/Seo'

export default function NotFoundPage({ message = 'The page you are looking for does not exist or has moved.' }) {
  return (
    <>
      <Seo title="Page Not Found" description={message} />
      <section className="flex min-h-[80svh] items-center bg-navy pt-32 pb-20">
        <div className="container-luxe text-center">
          <p className="font-display text-[140px] leading-none text-gold/30 sm:text-[200px]">404</p>
          <h1 className="mt-2 font-display text-4xl text-white sm:text-5xl">Page not found</h1>
          <p className="mx-auto mt-5 max-w-md text-white/65">{message}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="btn-gold">
              Back to home
            </Link>
            <Link to="/properties" className="btn-outline-light">
              Browse properties <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
