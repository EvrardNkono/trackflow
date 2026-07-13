// src/pages/ServicesPage.jsx
import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Truck, Plane, Ship, Globe, PawPrint, Package, 
  ArrowRight, CheckCircle, Star, Users, Clock, Shield,
  Sparkles, Zap, Award, TrendingUp
} from 'lucide-react'

const ServicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ServicesHero />
        <ServicesGrid />
        <HowItWorks />
        <WhyChooseUs />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

// Hero Section Premium
const ServicesHero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background avec gradient et pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/10 rounded-full" />
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-custom text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Premium Logistics Services</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
          Our <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">Services</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          Comprehensive logistics solutions tailored to your needs
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
            <CheckCircle className="w-4 h-4 text-green-300" />
            25+ Years Experience
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
            <Users className="w-4 h-4 text-blue-300" />
            380K+ Happy Clients
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
            <Globe className="w-4 h-4 text-purple-300" />
            220+ Countries
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Grid Premium
const ServicesGrid = () => {
  const services = [
    {
      icon: Truck,
      title: 'Land Transport',
      description: 'We provide a comprehensive distribution and delivery network across the Globe. With 25 years of experience and a fleet of over 150 vehicles',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      delay: 0
    },
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'Trans Dispatch Express offers a number of air freight services with day-specific or day-definite scheduling, door-to-door service, and delivery within one to five business days.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      delay: 100
    },
    {
      icon: Ship,
      title: 'Sea Shipping',
      description: 'A typical cargo ship can carry around 18,000 containers, which means that sea freight is a cost-efficient way to transport high quantities over large distances.',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      delay: 200
    },
    {
      icon: Globe,
      title: 'International Forwarding',
      description: 'Cross-border and global freight-forwarding solutions to handle virtually any shipping situation.',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      delay: 300
    },
    {
      icon: PawPrint,
      title: 'Pet Relocation',
      description: 'Take your friend wherever life takes you. We\'re reimagining the way pets move around the world.',
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      delay: 400
    },
    {
      icon: Package,
      title: 'Discreet Deliveries',
      description: 'Discreet packaging is packaging that\'s designed to keep your contents and the brand a secret so people can\'t guess which products are inside.',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      delay: 500
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            WHAT WE OFFER
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive <span className="text-orange-500">Logistics</span> Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From land transport to international forwarding, we've got you covered
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div 
                key={index} 
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${service.delay}ms` }}
              >
                {/* Gradient overlay au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge "Popular" aléatoire */}
                {index % 3 === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="relative p-8">
                  {/* Icon avec effet glassmorphisme */}
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`bg-gradient-to-br ${service.color} rounded-xl p-3`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Lien "Learn More" */}
                  <div className="mt-4 flex items-center text-orange-600 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// How It Works Premium
const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Register Shipment',
      description: 'Whether you have a QR code from a retailer or need to create a shipping label, we\'ve got you covered. You can also drop off your return at a retail location.',
      icon: Package
    },
    {
      number: '02',
      title: 'Get Tracking Code',
      description: 'Build loyalty with a positive returns experience. Find multiple ways to provide return labels to customers, get insights to reduce returns, and more.',
      icon: Clock
    },
    {
      number: '03',
      title: 'Monitor Shipment',
      description: 'With free picture proof of delivery, you\'ll know when and where your residential shipment was left. If you\'re a small business shipper, it may help reduce service calls.',
      icon: Shield
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
            SIMPLE PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It <span className="text-orange-500">Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trust us to make returns oh-so-easy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Ligne de connexion (visible sur desktop) */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Étape numéro avec cercle */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-orange-200">
                      <span className="text-xs font-bold text-orange-600">{step.number}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>

                  {/* Petit indicateur de progression */}
                  <div className="mt-4 flex items-center gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          i <= index ? 'bg-orange-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Why Choose Us Section
const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Award,
      title: '25+ Years Experience',
      description: 'With over two decades of logistics excellence, we deliver trust and reliability.',
      color: 'text-amber-500'
    },
    {
      icon: TrendingUp,
      title: '380K+ Happy Clients',
      description: 'Join thousands of satisfied customers who trust us with their shipments.',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Our network ensures your packages arrive on time, every time.',
      color: 'text-purple-500'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
            WHY US
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-orange-500">Track Flow</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 mx-auto rounded-full ${reason.color} bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${reason.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section Premium
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alice',
      role: 'Verified Client',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      quote: 'We are thoroughly pleased with the constant attention given to our account, and this company, especially Martin Marin, ensures smooth and efficient custom clearance and delivery – we would definitely recommend using Trans Dispatch Express for any and all of your shipping needs.',
      rating: 5
    },
    {
      name: 'Ethan Jackson',
      role: 'Verified Client',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'I truly appreciate the support given to me by Trans Dispatch Express in taking care of my import needs especially as a startup business in the USA when I needed it most. I find that their friendly and personal touch which far exceeds the routine business demeanor very satisfying and refreshing.',
      rating: 5
    },
    {
      name: 'Dave Logan',
      role: 'Verified Client',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'Trans Dispatch is the one Company I would & have recommended to other importers. I forward the paperwork for air and ocean shipments and things are taken care of immediately. I get my necessary reports without fail by the end of day.',
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 rounded-full text-sm font-semibold mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-orange-500">Clients Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Guillemets */}
              <div className="absolute top-4 right-6 text-6xl text-orange-100 font-serif leading-none">
                "
              </div>

              {/* Étoiles */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-orange-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 italic">Verified Client</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed relative z-10">
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            See More Client Reviews
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-400">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of satisfied customers who trust us with their shipments
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 inline-flex items-center gap-2"
          >
            Contact Us Now
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/tracking"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            Track Shipment
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage