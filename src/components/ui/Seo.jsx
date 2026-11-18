import { useEffect } from 'react'

const SITE = 'Real Estate Miami Life'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Per-page SEO: updates <title>, description, Open Graph and Twitter tags.
 * Updates the tags defined in index.html instead of appending duplicates.
 */
export default function Seo({ title, description, image = '/images/miami-brickell-aerial.webp', type = 'website' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Real Estate Agent in Miami, FL`
    document.title = fullTitle
    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }
    setMeta('property', 'og:title', fullTitle)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:url', window.location.href)
  }, [title, description, image, type])

  return null
}
