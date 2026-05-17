import Hero from '@/components/sections/Hero'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { FreelanceCTA } from '@/components/sections/FreelanceCTA'
import { ScrollMarker } from '@/components/ui/ScrollMarker'

export default function HomePage() {
  return (
    <>
      <ScrollMarker />
      <Hero />
      <FeaturedProjects />
      <FreelanceCTA />
    </>
  )
}
