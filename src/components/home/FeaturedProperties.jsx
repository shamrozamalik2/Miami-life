import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import PropertyCard from '../property/PropertyCard'
import { featuredProperties } from '../../data/properties'

export default function FeaturedProperties() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Properties"
            title={
              <>
                Homes worth <em className="text-gold-dark">a closer look</em>
              </>
            }
            intro="A selection of sample listings showing how condos, homes and penthouses across Miami can be presented to buyers and tenants."
          />
          <Reveal>
            <Link to="/properties" className="btn-outline-dark shrink-0">
              View all properties <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 120}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
