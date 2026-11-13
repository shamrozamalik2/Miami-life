const nf = new Intl.NumberFormat('en-US')

/** "AED 2,950,000" or "AED 90,000 / year" for rentals */
export function formatPrice(price, purpose) {
  const base = `AED ${nf.format(price)}`
  return purpose === 'rent' ? `${base} / year` : base
}

/** Compact form for dropdowns: AED 1.5M, AED 250K */
export function formatCompactAED(value) {
  if (value >= 1_000_000) return `AED ${+(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `AED ${Math.round(value / 1_000)}K`
  return `AED ${value}`
}

export const formatArea = (sqft) => `${nf.format(sqft)} sq ft`
