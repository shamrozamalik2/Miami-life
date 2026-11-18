import { useEffect, useState } from 'react'
import { company, reviews as fallbackReviews } from '../data/company'

/**
 * Live Google reviews via the official Maps JavaScript API (Places library, `Place` class).
 *
 * Setup (see README):
 *   VITE_GOOGLE_MAPS_API_KEY  – browser key restricted by HTTP referrer to your domain,
 *                               with "Maps JavaScript API" + "Places API (New)" enabled
 *   VITE_GOOGLE_PLACE_ID      – optional; if missing, the business is found by name search
 *
 * Google returns at most 5 reviews per place. Results are cached for the browser session.
 * Without a key — or if anything fails — the verbatim excerpts in data/company.js are shown.
 */
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID
const CACHE_KEY = 'ml-google-reviews-v1'

const fallback = {
  source: 'fallback',
  rating: company.rating,
  count: company.reviewCount,
  url: company.mapsSearchUrl,
  reviews: fallbackReviews.map((r) => ({ author: r.author, text: r.text })),
}

let loader
function loadMapsApi() {
  if (window.google?.maps?.importLibrary) return Promise.resolve()
  if (loader) return loader
  loader = new Promise((resolve, reject) => {
    const cb = '__mlMapsReady'
    window[cb] = () => resolve()
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(API_KEY)}&v=weekly&loading=async&callback=${cb}`
    s.async = true
    s.onerror = () => reject(new Error('Google Maps script failed to load'))
    document.head.appendChild(s)
  })
  return loader
}

async function fetchReviews() {
  await loadMapsApi()
  const { Place } = await window.google.maps.importLibrary('places')

  let place
  if (PLACE_ID) {
    place = new Place({ id: PLACE_ID })
  } else {
    const { places } = await Place.searchByText({
      textQuery: `${company.name} ${company.serviceArea}`,
      fields: ['id'],
      maxResultCount: 1,
    })
    if (!places?.length) throw new Error('Business not found')
    place = places[0]
  }

  await place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews', 'googleMapsURI'] })
  const reviews = (place.reviews || [])
    .filter((r) => r.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName || 'Google user',
      authorUrl: r.authorAttribution?.uri,
      photo: r.authorAttribution?.photoURI,
      rating: r.rating,
      text: r.text,
      when: r.relativePublishTimeDescription,
    }))
  if (!reviews.length) throw new Error('No reviews returned')

  return {
    source: 'google',
    rating: place.rating ? place.rating.toFixed(1) : company.rating,
    count: place.userRatingCount ?? company.reviewCount,
    url: place.googleMapsURI || company.mapsSearchUrl,
    reviews,
  }
}

export default function useGoogleReviews() {
  const [data, setData] = useState(() => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) return JSON.parse(cached)
    } catch {
      /* storage unavailable */
    }
    return fallback
  })

  useEffect(() => {
    if (!API_KEY || data.source === 'google') return
    let cancelled = false
    fetchReviews()
      .then((live) => {
        if (cancelled) return
        setData(live)
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(live))
        } catch {
          /* storage unavailable */
        }
      })
      .catch((err) => {
        // Keep the verbatim fallback reviews; log for the developer
        console.warn('[Google reviews] using fallback:', err.message)
      })
    return () => {
      cancelled = true
    }
  }, [data.source])

  return data
}
