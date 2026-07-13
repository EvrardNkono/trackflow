import React from 'react'

const PartnersSection = () => {
  const partners = [
    { 
      name: 'DHM', 
      logo: '/images/dhl.png',
      alt: 'DHM Logistics'
    },
    { 
      name: 'FedEx', 
      logo: '/images/fedex.jpg',
      alt: 'FedEx Express'
    },
    { 
      name: 'Schenker', 
      logo: '/images/schenker.png',
      alt: 'Schenker Logistics'
    },
    { 
      name: 'Mondial Relay', 
      logo: '/images/mondialrelay.webp',
      alt: 'Mondial Relay'
    },
  ]

  return (
    <section className="section-padding bg-orange-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with the world's leading logistics companies to provide you with the best shipping solutions.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group flex items-center justify-center p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <img 
                src={partner.logo} 
                alt={partner.alt || partner.name} 
                className="h-12 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-600 font-medium">
              Trusted by 380,000+ customers worldwide
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection