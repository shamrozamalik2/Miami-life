/**
 * Pure filter function shared by the search bar and listings page.
 * Filters come from URL search params, so every value is a string ('' = any).
 */
export function filterProperties(list, filters) {
  const { purpose, type, location, minPrice, maxPrice, beds, q } = filters
  const min = Number(minPrice) || 0
  const max = Number(maxPrice) || Infinity
  const minBeds = Number(beds) || 0
  const query = (q || '').trim().toLowerCase()

  return list.filter((p) => {
    if (purpose && p.purpose !== purpose) return false
    if (type && p.type !== type) return false
    if (location && p.location !== location) return false
    if (p.price < min || p.price > max) return false
    if (minBeds && p.bedrooms < minBeds) return false
    if (query) {
      const haystack = `${p.title} ${p.location} ${p.type}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })
}

export function sortProperties(list, sort) {
  const sorted = [...list]
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  else if (sort === 'area-desc') sorted.sort((a, b) => b.area - a.area)
  return sorted
}
