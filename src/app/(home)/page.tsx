import React from "react"
import Features from "@/components/Features"
import HeroImage from "@/components/HeroImage"
import FeaturedProducts from "@/components/FeaturedProducts"
import Banner from "@/components/Banner"
import BestSellers from "@/components/BestSellers"
import UserFeatures from "@/components/UserFeatures"

function HomePage() {

  return (
    <>
      <HeroImage />
      <Features />
      <FeaturedProducts />
      <Banner />
      <BestSellers />
      <UserFeatures />
    </>
  )
}

export default HomePage