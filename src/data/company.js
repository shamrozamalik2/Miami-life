// Verified business information only (from the Google Business Profile).
// Do not add awards, years in business, team size, licences or a street address here
// unless the business confirms them.
export const company = {
  name: 'Real Estate Miami Life',
  shortName: 'Miami Life',
  type: 'Real Estate Agent',
  phoneDisplay: '+1 305-792-8404',
  phoneHref: 'tel:+13057928404',
  whatsappNumber: '13057928404',
  whatsappUrl: 'https://wa.me/13057928404',
  city: 'Miami',
  region: 'Florida',
  serviceArea: 'Miami, Florida',
  rating: '5.0',
  reviewCount: 23,
  mapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=Real+Estate+Miami+Life',
  // No public street address on the profile: the map shows the Miami area served.
  mapsEmbedUrl: 'https://maps.google.com/maps?q=Brickell%2C%20Miami%2C%20FL&z=13&output=embed',
}

/**
 * Excerpts of public Google reviews, quoted as displayed on the Google Business Profile
 * (Google truncates long reviews, hence the ellipses). Keep these verbatim.
 */
export const reviews = [
  {
    author: 'Michael O',
    text: 'Karina and Carlos were absolutely incredible when it came to finding a place to rent in Miami! If you’re looking to move to Brickell or Downtown, call Karina. She has a wealth of knowledge of not only the area but also the intricacies of …',
  },
  {
    author: 'Shana Vold',
    text: 'Karina was an amazing help. If anyone is relocating from out of state, I high recommend working with her. I moved from the Midwest for a job, and I had never even been to Miami! I was not familiar with the rental market in South Florida so …',
  },
  {
    author: 'Sean Chowdhari',
    text: 'My real estate agent Karina is absolutely outstanding. She is exceptionally proficient and enthusiastic about doing her job and looking out for her client’s interests. Karina’s professionalism was apparent right from the start of our work …',
  },
]

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message) {
  if (!message) return company.whatsappUrl
  return `${company.whatsappUrl}?text=${encodeURIComponent(message)}`
}
