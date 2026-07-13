import React from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import TrackingForm from '../components/TrackingForm'
import StatsSection from '../components/StatsSection'
import AboutSection from '../components/AboutSection'
import TestimonialsSection from '../components/TestimonialsSection'
import PartnersSection from '../components/PartnersSection'
import CTASection from '../components/CTASection'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <TrackingForm />
        <StatsSection />
        <AboutSection />
        <TestimonialsSection />
        <PartnersSection />
        <CTASection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage