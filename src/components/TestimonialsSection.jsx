import React from 'react'

const TestimonialCard = ({ name, role, image, quote }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <img 
        src={image} 
        alt={name} 
        className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-orange-200"
      />
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500 italic">Verified Client</p>
      </div>
    </div>
    <p className="text-gray-600 leading-relaxed">
      <span className="text-3xl text-orange-500">"</span>
      {quote}
      <span className="text-3xl text-orange-500">"</span>
    </p>
  </div>
)

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alice',
      role: 'Verified Client',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      quote: 'We are thoroughly pleased with the constant attention given to our account, and this company, especially Martin Marin, ensures smooth and efficient custom clearance and delivery – we would definitely recommend using Trans Dispatch Express for any and all of your shipping needs.'
    },
    {
      name: 'Ethan Jackson',
      role: 'Verified Client',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      quote: 'I truly appreciate the support given to me by Trans Dispatch Express in taking care of my import needs especially as a startup business in the USA when I needed it most. I find that their friendly and personal touch which far exceeds the routine business demeanor very satisfying and refreshing.'
    },
    {
      name: 'Dave Logan',
      role: 'Verified Client',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      quote: 'Trans Dispatch is the one Company I would & have recommended to other importers. I forward the paperwork for air and ocean shipments and things are taken care of immediately. I get my necessary reports without fail by the end of day.'
    }
  ]

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="text-center mt-12">
          <a
            href="#"
            className="btn-orange inline-block"
          >
            See More Client Reviews
          </a>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection