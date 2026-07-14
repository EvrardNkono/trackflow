import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PartnersSection from '../components/PartnersSection'
import NewsletterSection from '../components/NewsletterSection'

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <AboutHero />
        
        {/* Stats Section */}
        <AboutStats />
        
        {/* Partners Section */}
        <PartnersSection />
        
        {/* Free Up Time Section */}
        <FreeUpTimeSection />
        
        {/* Trusted Services Section */}
        <TrustedServicesSection />
        
        {/* Newsletter Section */}
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}

// Hero Section
const AboutHero = () => {
  return (
    <section className="py-12 md:py-16 bg-orange-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Know About Us
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-600 mb-4">
              Design a successful delivery plan.
            </h2>
            
            <div className="flex items-center gap-2 text-gray-700 mb-6">
              <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span>United Kingdom, USA, Australia, Canada, &amp; Many More</span>
            </div>
            
            <a href="#" className="btn-orange inline-block">
              Learn More
            </a>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              We have consistently transformed, molded, and streamlined the logistics industry. 
              We are creators, innovators, and thinkers who consistently push the boundaries of 
              what is conceivable, from creating the global air express market to rising to the 
              top of the logistics sector. We're now getting close to the last frontier: sending 
              packages to the moon.
            </p>
            <p>
              Since every cargo we provide is centered on the needs of our customers, 
              <strong className="text-orange-600"> Cargo Track Flow Express</strong> is honored to 
              have received multiple prestigious accolades for great success in sales and customer 
              service. See our list of honors here.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Stats Section
const AboutStats = () => {
  const [counts, setCounts] = useState({ years: 0, countries: 0, branches: 0, customers: 0 })
  const [hasAnimated, setHasAnimated] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          let current = 0
          
          const targets = { years: 25, countries: 250, branches: 85, customers: 380 }
          const increments = {
            years: targets.years / steps,
            countries: targets.countries / steps,
            branches: targets.branches / steps,
            customers: targets.customers / steps
          }

          const timer = setInterval(() => {
            current++
            if (current >= steps) {
              setCounts(targets)
              clearInterval(timer)
            } else {
              setCounts({
                years: Math.floor(increments.years * current),
                countries: Math.floor(increments.countries * current),
                branches: Math.floor(increments.branches * current),
                customers: Math.floor(increments.customers * current)
              })
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const stats = [
    { 
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      value: counts.years,
      label: 'Years Of Experience',
      suffix: ''
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      value: counts.countries,
      label: 'Delivering Countries',
      suffix: '+'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      value: counts.branches,
      label: 'Global Branches',
      suffix: '+'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      value: counts.customers,
      label: 'Happy Customers',
      suffix: 'K+'
    }
  ]

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-orange-600 font-semibold mb-2">Friendly team</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            You Can Trust Your Car To Us
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-orange-600">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Free Up Time Section
const FreeUpTimeSection = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Free up time with convenient shipping options
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Clients at present are frequently on the move and expect their purchases to come 
                faster and cheaper than ever before. The globe is getting increasingly linked. That 
                is why a strong, worldwide network is required to manage your supply chain.
              </p>
              <p>
                With 380,000 individuals in over 220 countries and territories worldwide, we are 
                reaching more people than ever before. And, as we imagine what the world may look 
                like in 2050, we're preparing for the logistical challenges that lie ahead.
              </p>
              <p className="font-medium text-orange-600">
                We do more than simply deliver stuff. Our purpose is to bring joy and success to all 
                we serve. Everywhere. Each and every day.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" 
              alt="Free up time with convenient shipping" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Trusted Services Section
const TrustedServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80" 
              alt="Trusted Services" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              We Provide Trusted Services For You
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                We is the expert in providing international events all around the world. We are happy 
                to be the Official Logistics Partner and committed to providing creative solutions for 
                challenging logistical issues in the sports, arts, and cultural spheres. Such prestigious 
                occasions raise the visibility of our company and offer a great venue for people to 
                witness Express Lines logistics in action.
              </p>
              <p>
                This strategy, which we employ across the board, guarantees that we can enhance service 
                performance and operational efficiency in a planned and long-term manner, adding value 
                for our clients at every turn. Because of our First Choice mentality, we regularly 
                review our work in order to improve it daily and everywhere. As a result, a company 
                that is adaptable and ready for change may rapidly and carefully adjust to changing 
                client needs.
              </p>
            </div>
            <a href="#" className="btn-orange mt-6 inline-block">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage