import React, { useState, useEffect } from 'react'

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Images locales depuis public/images/
  const slides = [
    {
      image: '/images/track.jfif',
    },
    {
      image: '/images/track2.jfif',
    },
    {
      image: '/images/track3.jfif',
    }
  ]

  // Logos des partenaires
  const partners = [
    { name: 'DHM', logo: '/images/dhl.png' },
    { name: 'FedEx', logo: '/images/fedex.jpg' },
    { name: 'Schenker', logo: '/images/schenker.png' },
    { name: 'Mondial Relay', logo: '/images/mondialrelay.webp' },
  ]

  // Doublé le tableau pour l'effet de défilement infini
  const doubledPartners = [...partners, ...partners]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Contenu principal */}
      <div className="relative z-10 container-custom h-full flex flex-col items-center justify-center text-center text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-in-up">
          Your Delivery Matters
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200">
          Cargo Track Flow makes every effort to make freight delivery less unpleasant. 
          That is why we have gathered a large tool collection to help simplify your 
          experience and make shipping with us easier.
        </p>
        
        {/* ✅ Badges d'accréditation - ANSI + ISO 2008 */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          {/* ANSI Badge */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <img 
              src="/images/acredited.webp" 
              alt="ANSI Accredited" 
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                ANSI Accredited
              </p>
              <p className="text-[8px] text-white/60">
                American National Standards Institute
              </p>
            </div>
          </div>

          {/* ✅ ISO 2008 Badge */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <img 
              src="/images/iso2000.png" 
              alt="ISO 2008 Certified" 
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                ISO 2008 Certified
              </p>
              <p className="text-[8px] text-white/60">
                International Organization for Standardization
              </p>
            </div>
          </div>
        </div>

        <a
          href="#tracking"
          className="btn-gradient-orange"
        >
          Track Shipment
        </a>
      </div>

      {/* Indicateurs de slide */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-orange-400 w-8' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Bandeau des partenaires en défilé */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-sm py-3 md:py-4 border-t border-white/10">
        <div className="container-custom overflow-hidden">
          <div className="relative">
            <div className="flex animate-scroll whitespace-nowrap">
              {doubledPartners.map((partner, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 mx-6 md:mx-10 flex items-center justify-center"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-6 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour l'animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}

export default HeroSection