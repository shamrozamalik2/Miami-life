// Verified company information only. Do not add awards, years, team size or achievements here.
export const company = {
  name: 'Ultimate Properties LLC',
  shortName: 'Ultimate Properties',
  type: 'Real Estate Agency',
  phoneDisplay: '+971 50 265 6531',
  phoneHref: 'tel:+971502656531',
  whatsappNumber: '971502656531',
  whatsappUrl: 'https://wa.me/971502656531',
  address: {
    building: 'Rejlers Abu Dhabi',
    office: 'Office 302, 3rd Floor',
    street: 'Hamdan Bin Mohammed Street',
    area: 'Al Danah, Zone 1',
    city: 'Abu Dhabi',
    country: 'United Arab Emirates',
  },
  rating: 4.8,
  reviewCount: 144,
  mapsSearchUrl:
    'https://www.google.com/maps/search/?api=1&query=Ultimate+Properties+LLC+Hamdan+Bin+Mohammed+Street+Abu+Dhabi',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Rejlers%20Abu%20Dhabi%2C%20Hamdan%20Bin%20Mohammed%20Street%2C%20Al%20Danah%2C%20Abu%20Dhabi&z=16&output=embed',
}

export const fullAddress = [
  company.address.building,
  company.address.office,
  company.address.street,
  company.address.area,
  `${company.address.city}, UAE`,
].join(', ')

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappLink(message) {
  if (!message) return company.whatsappUrl
  return `${company.whatsappUrl}?text=${encodeURIComponent(message)}`
}
