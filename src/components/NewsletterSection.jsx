import React, { useState } from 'react'

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="section-padding bg-gradient-to-r from-orange-600 to-orange-400">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Subscribe To Our Newsletter
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Enjoy competitive pricing, more direct routes and less handling, 
          thanks to our nearly 7000 next-day lanes.
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />
          <button
            type="submit"
            className="bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>

        {subscribed && (
          <div className="mt-4 text-white font-semibold animate-bounce">
            ✅ Thanks for subscribing!
          </div>
        )}

        <div className="mt-8">
          <a
            href="#"
            className="inline-block bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-colors duration-200"
          >
            Reach out To Us
          </a>
        </div>
      </div>
    </section>
  )
}

export default NewsletterSection