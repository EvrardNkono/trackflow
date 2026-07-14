// src/pages/ReviewsPage.jsx
import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Star, Quote, Users, Award, ThumbsUp, 
  TrendingUp, CheckCircle, ChevronLeft, ChevronRight
} from 'lucide-react'

const ReviewsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ReviewsHero />
        <StatsSection />
        <TestimonialsGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

// Hero Section Premium
const ReviewsHero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
          <Users className="w-4 h-4" />
          <span>380K+ Happy Clients</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Customer <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">Testimonials</span>
        </h1>
        
        <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          What our clients say about us
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            4.9/5 Average Rating
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
            <ThumbsUp className="w-4 h-4 text-green-300" />
            98% Satisfaction Rate
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
            <Award className="w-4 h-4 text-purple-300" />
            Verified Reviews
          </div>
        </div>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const stats = [
    { label: 'Happy Clients', value: '380K+', icon: Users, color: 'text-blue-500' },
    { label: '5-Star Reviews', value: '4.9/5', icon: Star, color: 'text-yellow-500' },
    { label: 'Satisfaction Rate', value: '98%', icon: ThumbsUp, color: 'text-green-500' },
    { label: 'Countries Served', value: '220+', icon: TrendingUp, color: 'text-purple-500' },
  ]

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto rounded-full bg-orange-50 flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Composant Avatar avec lettre
const AvatarLetter = ({ name }) => {
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase()
  }

  const getColor = (name) => {
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500',
      'bg-cyan-500', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500',
      'bg-violet-500', 'bg-fuchsia-500', 'bg-lime-500', 'bg-sky-500'
    ]
    const index = name.charCodeAt(0) % colors.length
    return colors[index]
  }

  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getColor(name)} border-2 border-white shadow-lg`}>
      {getInitials(name)}
    </div>
  )
}

// Testimonials Grid
const TestimonialsGrid = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const testimonialsPerPage = 6

  const testimonials = [
    {
      id: 1,
      name: 'Alice Martin',
      role: 'Verified Client',
      quote: 'We are thoroughly pleased with the constant attention given to our account. Martin Marin ensures smooth and efficient custom clearance and delivery. We would definitely recommend using Cargo Track Flow for any and all of your shipping needs.',
      rating: 5,
      location: 'New York, USA'
    },
    {
      id: 2,
      name: 'Ethan Jackson',
      role: 'Verified Client',
      quote: 'I truly appreciate the support given to me in taking care of my import needs as a startup business in the USA. Their friendly and personal touch is very satisfying and refreshing. Their support is unique.',
      rating: 5,
      location: 'Los Angeles, USA'
    },
    {
      id: 3,
      name: 'Dave Logan',
      role: 'Verified Client',
      quote: 'Cargo Track Flow is the one Company I would recommend to other importers. I forward the paperwork for air and ocean shipments and things are taken care of immediately. I get my necessary reports without fail.',
      rating: 4,
      location: 'Chicago, USA'
    },
    {
      id: 4,
      name: 'Samantha Blake',
      role: 'Verified Client',
      quote: 'Cargo Track Flow has been a lifesaver for our business. The efficiency and attention to detail in handling our shipments are unmatched. I wouldn\'t trust anyone else with our logistics needs.',
      rating: 5,
      location: 'London, UK'
    },
    {
      id: 5,
      name: 'Michael Rodriguez',
      role: 'Verified Client',
      quote: 'From the moment we partnered, our shipping process has been seamless. The team\'s dedication to ensuring timely delivery is commendable. Highly recommended for any business.',
      rating: 4,
      location: 'Miami, USA'
    },
    {
      id: 6,
      name: 'Natalie Kim',
      role: 'Verified Client',
      quote: 'Cargo Track Flow truly understands the urgency of our shipping requirements. The personal attention and quick responses make a world of difference. We are very satisfied with their services.',
      rating: 5,
      location: 'Seoul, South Korea'
    },
    {
      id: 7,
      name: 'David Foster',
      role: 'Verified Client',
      quote: 'Switching to Cargo Track Flow was the best decision for our import business. The efficiency and professionalism exhibited by their team have greatly improved our operations. Excellent service!',
      rating: 5,
      location: 'Sydney, Australia'
    },
    {
      id: 8,
      name: 'Emily Nguyen',
      role: 'Verified Client',
      quote: 'The team has consistently gone above and beyond to ensure our shipments are handled with care and precision. Their exceptional service has earned our trust and loyalty completely.',
      rating: 5,
      location: 'Ho Chi Minh City, Vietnam'
    },
    {
      id: 9,
      name: 'James Carter',
      role: 'Verified Client',
      quote: 'Cargo Track Flow has provided us with unparalleled support in managing our international shipments. The professionalism and prompt communication make them a standout choice for any business.',
      rating: 4,
      location: 'Toronto, Canada'
    },
    {
      id: 10,
      name: 'Olivia White',
      role: 'Verified Client',
      quote: 'We have been using Cargo Track Flow for all our shipping needs, and they have never disappointed. The reliability and efficiency are second to none. A truly exceptional service provider.',
      rating: 5,
      location: 'Paris, France'
    },
    {
      id: 11,
      name: 'Liam Anderson',
      role: 'Verified Client',
      quote: 'Cargo Track Flow consistently delivers top-notch service. The team is always on top of our shipping requirements, ensuring everything runs smoothly. We highly recommend them to everyone.',
      rating: 5,
      location: 'Berlin, Germany'
    },
    {
      id: 12,
      name: 'Grace Martinez',
      role: 'Verified Client',
      quote: 'The level of service provided has been outstanding. Their attention to detail and commitment to customer satisfaction have made our shipping process completely worry-free.',
      rating: 4,
      location: 'Madrid, Spain'
    },
    {
      id: 13,
      name: 'Benjamin Clark',
      role: 'Verified Client',
      quote: 'We are extremely impressed with the professionalism and efficiency. The team ensures our shipments are handled with the utmost care. They are a valuable partner to our business.',
      rating: 5,
      location: 'Melbourne, Australia'
    },
    {
      id: 14,
      name: 'Sophia Hernandez',
      role: 'Verified Client',
      quote: 'Cargo Track Flow has exceeded our expectations in every way. The dedicated service and the entire team make them our go-to logistics provider. We highly recommend their services.',
      rating: 5,
      location: 'Mexico City, Mexico'
    },
    {
      id: 15,
      name: 'Noah Scott',
      role: 'Verified Client',
      quote: 'Working with Cargo Track Flow has been a game-changer for our shipping needs. The prompt and personalized service is remarkable. We couldn\'t be happier with their services.',
      rating: 5,
      location: 'Dubai, UAE'
    },
    {
      id: 16,
      name: 'Mia Brown',
      role: 'Verified Client',
      quote: 'The attention to detail and exceptional customer service have made them an invaluable partner. We trust them completely with our logistics needs. Highly recommended!',
      rating: 4,
      location: 'Singapore'
    },
    {
      id: 17,
      name: 'Daniel Thompson',
      role: 'Verified Client',
      quote: 'Cargo Track Flow has consistently delivered outstanding service. The professionalism and responsiveness have made a significant impact on our business operations.',
      rating: 5,
      location: 'Auckland, New Zealand'
    },
    {
      id: 18,
      name: 'Ava Walker',
      role: 'Verified Client',
      quote: 'We are extremely pleased with the services provided. The team\'s dedication to ensuring timely and accurate deliveries has been instrumental to our success. They are truly exceptional.',
      rating: 5,
      location: 'Cape Town, South Africa'
    },
    {
      id: 19,
      name: 'William Chen',
      role: 'Verified Client',
      quote: 'Cargo Track Flow has made international shipping so much easier for our business. Their team is professional, responsive, and always goes the extra mile to ensure satisfaction.',
      rating: 4,
      location: 'Shanghai, China'
    },
    {
      id: 20,
      name: 'Emma Wilson',
      role: 'Verified Client',
      quote: 'The support and efficiency provided by Cargo Track Flow is outstanding. They have streamlined our logistics and saved us both time and money. A truly professional service.',
      rating: 5,
      location: 'Dublin, Ireland'
    }
  ]

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)
  const startIndex = currentPage * testimonialsPerPage
  const endIndex = startIndex + testimonialsPerPage
  const currentTestimonials = testimonials.slice(startIndex, endIndex)

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Badge de rating */}
              <div className="absolute top-4 right-4 flex">
                {renderStars(testimonial.rating)}
              </div>

              <div className="flex items-center mb-4">
                <AvatarLetter name={testimonial.name} />
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 italic">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-orange-100 opacity-50" />
                <p className="text-gray-600 leading-relaxed pl-4 relative z-10">
                  <span className="text-3xl text-orange-500">"</span>
                  {testimonial.quote.length > 160 
                    ? `${testimonial.quote.substring(0, 160)}...` 
                    : testimonial.quote
                  }
                  <span className="text-3xl text-orange-500">"</span>
                </p>
              </div>

              {/* Badge Verified */}
              <div className="mt-4 flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="w-3 h-3" />
                <span>Verified Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === currentPage 
                      ? 'bg-orange-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages - 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 shadow-md'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-400">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Experience Track Flow?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Join thousands of satisfied customers who trust us with their shipments
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          Get Started Now
        </a>
      </div>
    </section>
  )
}

export default ReviewsPage