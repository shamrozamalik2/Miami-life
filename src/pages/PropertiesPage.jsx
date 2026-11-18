import { useId, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Info, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import Seo from '../components/ui/Seo'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import PropertyCard from '../components/property/PropertyCard'
import { locations, priceOptions, properties, propertyTypes } from '../data/properties'
import { filterProperties, sortProperties } from '../utils/filterProperties'
import { formatCompactUSD } from '../utils/format'
import { whatsappLink } from '../data/company'
import WhatsAppIcon from '../components/ui/WhatsAppIcon'

const FILTER_KEYS = ['purpose', 'type', 'location', 'minPrice', 'maxPrice', 'beds', 'q']

function Segmented({ label, value, options, onChange }) {
  return (
    <fieldset>
      <legend className="field-label">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map(([val, text]) => (
          <button
            key={val}
            type="button"
            aria-pressed={value === val}
            onClick={() => onChange(val)}
            className={`min-w-0 flex-1 border px-1 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
              value === val
                ? 'border-navy bg-navy text-white'
                : 'border-navy/15 bg-white text-ink/80 hover:border-navy/40'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function FilterPanel({ filters, setFilter, reset, activeCount }) {
  const uid = useId()
  const prices = priceOptions[filters.purpose || 'any']
  return (
    <div className="space-y-7">
      <div className="relative">
        <label htmlFor={uid + '-q'} className="field-label">
          Keyword
        </label>
        <Search size={16} className="pointer-events-none absolute bottom-4 left-4 text-muted" aria-hidden="true" />
        <input
          id={uid + '-q'}
          type="search"
          value={filters.q}
          onChange={(e) => setFilter('q', e.target.value)}
          placeholder="e.g. penthouse, Brickell"
          className="field !pl-11"
        />
      </div>

      <Segmented
        label="Buy / Rent"
        value={filters.purpose}
        onChange={(v) => setFilter('purpose', v, { clearPrices: true })}
        options={[
          ['', 'All'],
          ['buy', 'Buy'],
          ['rent', 'Rent'],
        ]}
      />

      <div>
        <label htmlFor={uid + '-type'} className="field-label">
          Property type
        </label>
        <select id={uid + '-type'} value={filters.type} onChange={(e) => setFilter('type', e.target.value)} className="field">
          <option value="">All types</option>
          {propertyTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor={uid + '-location'} className="field-label">
          Location
        </label>
        <select
          id={uid + '-location'}
          value={filters.location}
          onChange={(e) => setFilter('location', e.target.value)}
          className="field"
        >
          <option value="">All Miami areas</option>
          {locations.map((l) => (
            <option key={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={uid + '-min'} className="field-label">
            Min price
          </label>
          <select id={uid + '-min'} value={filters.minPrice} onChange={(e) => setFilter('minPrice', e.target.value)} className="field">
            <option value="">No min</option>
            {prices.map((p) => (
              <option key={p} value={p}>
                {formatCompactUSD(p)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={uid + '-max'} className="field-label">
            Max price
          </label>
          <select id={uid + '-max'} value={filters.maxPrice} onChange={(e) => setFilter('maxPrice', e.target.value)} className="field">
            <option value="">No max</option>
            {prices.map((p) => (
              <option key={p} value={p}>
                {formatCompactUSD(p)}
              </option>
            ))}
          </select>
        </div>
        {filters.purpose === 'rent' && <p className="col-span-2 -mt-1 text-[12px] text-muted">Rental prices are per month.</p>}
      </div>

      <Segmented
        label="Bedrooms"
        value={filters.beds}
        onChange={(v) => setFilter('beds', v)}
        options={[
          ['', 'Any'],
          ['1', '1+'],
          ['2', '2+'],
          ['3', '3+'],
          ['4', '4+'],
          ['5', '5+'],
        ]}
      />

      <button
        type="button"
        onClick={reset}
        disabled={!activeCount}
        className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:text-gold-dark disabled:opacity-40"
      >
        <RotateCcw size={14} /> Reset filters
      </button>
    </div>
  )
}

export default function PropertiesPage() {
  const [params, setParams] = useSearchParams()
  const [drawer, setDrawer] = useState(false)

  const filters = Object.fromEntries(FILTER_KEYS.map((k) => [k, params.get(k) || '']))
  const sort = params.get('sort') || 'featured'
  const activeCount = FILTER_KEYS.filter((k) => filters[k]).length

  const setFilter = (key, value, { clearPrices = false } = {}) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (clearPrices) {
      next.delete('minPrice')
      next.delete('maxPrice')
    }
    setParams(next, { replace: true })
  }
  const reset = () => setParams(sort !== 'featured' ? { sort } : {}, { replace: true })

  const results = useMemo(
    () => sortProperties(filterProperties(properties, filters), sort),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params.toString()],
  )

  const heading =
    filters.purpose === 'buy' ? 'Properties for Sale' : filters.purpose === 'rent' ? 'Properties for Rent' : 'Our Properties'
  const where = filters.location ? `in ${filters.location}` : 'in Miami'

  return (
    <>
      <Seo
        title={`${heading} ${where}`}
        description={`Browse ${
          filters.purpose === 'rent' ? 'rental' : filters.purpose === 'buy' ? 'sale' : 'sale and rental'
        } condos, houses, townhouses and penthouses ${where} with Real Estate Miami Life. Filter by price, bedrooms and location.`}
      />
      <PageHero
        eyebrow={filters.purpose ? (filters.purpose === 'buy' ? 'Buy' : 'Rent') : 'Listings'}
        title={`${heading} ${where}`}
        intro="Search condos, houses, townhouses and penthouses. Filter by price, bedrooms and neighborhood."
        image="/images/miami-beach-aerial.webp"
        crumbs={[{ label: 'Properties' }]}
      />

      <section className="py-14 sm:py-20">
        <div className="container-luxe">
          <div className="mb-10 flex items-start gap-3 border-l-2 border-gold bg-white px-5 py-4 text-[13.5px] leading-relaxed text-ink/80">
            <Info size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            <p>
              <strong className="font-semibold text-navy">Sample listings for demonstration.</strong> The properties below
              illustrate how listings will appear on the website. They are not current inventory and are not available
              for sale or rent.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[300px_1fr] xl:gap-14">
            {/* Desktop filters */}
            <aside aria-label="Property filters" className="hidden lg:block">
              <div className="sticky top-28 bg-white p-7">
                <h2 className="mb-7 flex items-center justify-between font-display text-2xl text-navy">
                  Refine search
                  <SlidersHorizontal size={18} className="text-gold" aria-hidden="true" />
                </h2>
                <FilterPanel filters={filters} setFilter={setFilter} reset={reset} activeCount={activeCount} />
              </div>
            </aside>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-5">
                <p className="text-[14px] text-muted" aria-live="polite">
                  <span className="font-display text-3xl text-navy">{results.length}</span>{' '}
                  {results.length === 1 ? 'property' : 'properties'} found
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setDrawer(true)}
                    className="flex items-center gap-2 border border-navy/15 bg-white px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-navy lg:hidden"
                  >
                    <SlidersHorizontal size={15} /> Filters
                    {activeCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] text-navy">
                        {activeCount}
                      </span>
                    )}
                  </button>
                  <label htmlFor="sort" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="sort"
                    value={sort}
                    onChange={(e) => setFilter('sort', e.target.value === 'featured' ? '' : e.target.value)}
                    className="field !w-auto !py-3 text-[13px]"
                  >
                    <option value="featured">Sort: Recommended</option>
                    <option value="price-asc">Price: Low to high</option>
                    <option value="price-desc">Price: High to low</option>
                    <option value="area-desc">Largest first</option>
                  </select>
                </div>
              </div>

              {results.length > 0 ? (
                <div className="mt-8 grid gap-7 sm:grid-cols-2 2xl:grid-cols-3">
                  {results.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 2) * 100}>
                      <PropertyCard property={p} priority={i < 2} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-8 flex flex-col items-center bg-white px-6 py-20 text-center">
                  <Search size={36} strokeWidth={1} className="text-gold" />
                  <h2 className="mt-6 font-display text-3xl text-navy">No properties match your search</h2>
                  <p className="mt-3 max-w-md text-muted">
                    Try widening your price range or removing a filter — or tell us what you need and we’ll look for you.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button type="button" onClick={reset} className="btn-navy">
                      <RotateCcw size={15} /> Reset filters
                    </button>
                    <a
                      href={whatsappLink('Hello, I am looking for a property in Miami. Can you help?')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold"
                    >
                      <WhatsAppIcon className="h-4 w-4" /> Ask on WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-[visibility] duration-500 lg:hidden ${drawer ? 'visible' : 'invisible'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
      >
        <div
          className={`absolute inset-0 bg-navy/60 transition-opacity duration-500 ${drawer ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setDrawer(false)}
        />
        <div
          className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-ivory transition-transform duration-500 ease-luxe ${
            drawer ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
            <h2 className="font-display text-2xl text-navy">Filters</h2>
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close filters" className="p-2 text-navy">
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-7">
            <FilterPanel filters={filters} setFilter={setFilter} reset={reset} activeCount={activeCount} />
          </div>
          <div className="border-t border-navy/10 p-5">
            <button type="button" onClick={() => setDrawer(false)} className="btn-navy w-full">
              Show {results.length} {results.length === 1 ? 'property' : 'properties'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
