const nf = new Intl.NumberFormat('en-US')

/** "$1,250,000" or "$3,400 / month" for rentals */
export function formatPrice(price, purpose) {
  const base = `$${nf.format(price)}`
  return purpose === 'rent' ? `${base} / month` : base
}

/** Compact form for dropdowns: $1.5M, $7.5K */
export function formatCompactUSD(value) {
  if (value >= 1_000_000) return `$${+(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `$${+(value / 1_000).toFixed(1)}K`
  return `$${value}`
}

export const formatArea = (sqft) => `${nf.format(sqft)} sq ft`

/** "Brickell, Miami" — but leave names that already contain Miami ("Miami Beach") as is */
export const placeName = (loc) => (loc.includes('Miami') ? loc : `${loc}, Miami`)
