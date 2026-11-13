import Seo from '../components/ui/Seo'
import Hero from '../components/home/Hero'
import SearchSection from '../components/home/SearchSection'
import FeaturedProperties from '../components/home/FeaturedProperties'
import Categories from '../components/home/Categories'
import WhyChoose from '../components/home/WhyChoose'
import Reviews from '../components/home/Reviews'
import Areas from '../components/home/Areas'
import ContactCTA from '../components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Real Estate Agency in Abu Dhabi — Buy & Rent Property"
        description="Find your perfect property in Abu Dhabi with Ultimate Properties LLC. Apartments, villas and townhouses to buy or rent. Office in Al Danah, Abu Dhabi. Rated 4.8 on Google."
      />
      <Hero />
      <SearchSection />
      <FeaturedProperties />
      <Categories />
      <WhyChoose />
      <Reviews />
      <Areas />
      <ContactCTA />
    </>
  )
}
