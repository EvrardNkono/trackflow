import React from 'react'

const AboutSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" 
              alt="About Cargo Track Flow" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Get freight delivered through the front door
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Let <strong className="text-orange-600">Cargo Track Flow Express</strong> do the heavy lifting 
                for your business. From medical equipment to family room furniture, make deliveries 
                convenient for your customers. Choosing us can also make pricing more straightforward 
                and reduce transit times.
              </p>
              <p>
                With 380,000 people in over 220 countries and territories worldwide, we're reaching 
                more people than ever. And, as we're already thinking about what the world in 2050 
                might look like, we're preparing for the logistics challenges that lie ahead.
              </p>
            </div>
            <a
              href="#"
              className="btn-orange mt-6 inline-block"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection