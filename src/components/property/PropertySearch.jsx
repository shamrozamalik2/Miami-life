import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { locations, priceOptions, propertyTypes } from '../../data/properties'
import { formatCompactUSD } from '../../utils/format'

/** Homepage search: Buy/Rent tabs + key fields, navigates to /properties with query params. */
export default function PropertySearch() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('buy')
  const [form, setForm] = useState({ location: '', type: '', beds: '', maxPrice: '' })

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const switchPurpose = (p) => {
    setPurpose(p)
    setForm((f) => ({ ...f, maxPrice: '' })) // price ranges differ between sale and rent
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ purpose })
    Object.entries(form).forEach(([k, v]) => v && params.set(k, v))
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <div className="bg-white shadow-[0_40px_80px_-40px_rgba(14,14,16,0.45)]">
      <div role="tablist" aria-label="Search type" className="flex border-b border-navy/10">
        {[
          ['buy', 'Buy'],
          ['rent', 'Rent'],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={purpose === value}
            onClick={() => switchPurpose(value)}
            className={`relative px-8 py-4 text-[12px] font-bold uppercase tracking-[0.24em] transition-colors ${
              purpose === value ? 'text-navy' : 'text-muted hover:text-navy'
            }`}
          >
            {label}
            <span
              className={`absolute inset-x-0 -bottom-px h-[2px] bg-gold transition-transform duration-500 ease-luxe ${
                purpose === value ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="grid gap-px bg-navy/10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
        <label className="bg-white px-6 py-4">
          <span className="field-label !mb-1">Location</span>
          <select
            value={form.location}
            onChange={update('location')}
            className="w-full appearance-none bg-transparent py-1 text-[15px] text-ink focus:outline-none"
          >
            <option value="">All Miami areas</option>
            {locations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
        <label className="bg-white px-6 py-4">
          <span className="field-label !mb-1">Property Type</span>
          <select
            value={form.type}
            onChange={update('type')}
            className="w-full appearance-none bg-transparent py-1 text-[15px] text-ink focus:outline-none"
          >
            <option value="">Any type</option>
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="bg-white px-6 py-4">
          <span className="field-label !mb-1">Bedrooms</span>
          <select
            value={form.beds}
            onChange={update('beds')}
            className="w-full appearance-none bg-transparent py-1 text-[15px] text-ink focus:outline-none"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+ bedrooms
              </option>
            ))}
          </select>
        </label>
        <label className="bg-white px-6 py-4">
          <span className="field-label !mb-1">Max Price{purpose === 'rent' ? ' / mo' : ''}</span>
          <select
            value={form.maxPrice}
            onChange={update('maxPrice')}
            className="w-full appearance-none bg-transparent py-1 text-[15px] text-ink focus:outline-none"
          >
            <option value="">No limit</option>
            {priceOptions[purpose].map((p) => (
              <option key={p} value={p}>
                {formatCompactUSD(p)}
              </option>
            ))}
          </select>
        </label>
        <div className="bg-white sm:col-span-2 lg:col-span-1">
          <button type="submit" className="btn-navy h-full w-full !py-6 lg:!px-10">
            <Search size={16} />
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
