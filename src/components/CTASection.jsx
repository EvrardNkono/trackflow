import React from 'react'

const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/images.jfif" 
              alt="Simplify shipping" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Simplify your business shipping
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We would sure provide a variety of tools to assist you in managing your shipping business. 
              Explore the choices below to get started, or join up for a membership to enjoy improved 
              capability while utilizing our tools.
            </p>
            <a
              href="#"
              className="btn-orange inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection