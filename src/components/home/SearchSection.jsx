import PropertySearch from '../property/PropertySearch'

/** Search panel that overlaps the bottom of the hero. */
export default function SearchSection() {
  return (
    <section aria-label="Search properties" className="relative z-10 -mt-24 sm:-mt-28">
      <div className="container-luxe">
        <div className="animate-fade-up [animation-delay:600ms]">
          <PropertySearch />
        </div>
      </div>
    </section>
  )
}
