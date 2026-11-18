import Seo from '../components/ui/Seo'
import Hero from '../components/home/Hero'
import SearchSection from '../components/home/SearchSection'
import FeaturedProperties from '../components/home/FeaturedProperties'
import Categories from '../components/home/Categories'
import WhyChoose from '../components/home/WhyChoose'
import Reviews from '../components/home/Reviews'
import Statement from '../components/home/Statement'
import Areas from '../components/home/Areas'
import ContactCTA from '../components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <Seo
        title="Miami Real Estate Agent — Buy & Rent in Brickell, Downtown & Beyond"
        description="Find your perfect property in Miami with Real Estate Miami Life. Condos, houses and townhouses to buy or rent in Brickell, Downtown Miami, Miami Beach and more. Rated 5.0 on Google."
      />
      <Hero />
      <SearchSection />
      <Statement />
      <FeaturedProperties />
      <Categories />
      <WhyChoose />
      <Reviews />
      <Areas />
      <ContactCTA />
    </>
  )
}
