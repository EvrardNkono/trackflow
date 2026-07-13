import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Package, Clock, Shield, Smartphone, Search, AlertCircle } from 'lucide-react'

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const code = trackingNumber.trim()
    
    if (!code) {
      setError('Please enter a tracking number')
      return
    }

    if (!/^TD[A-Z0-9]+$/.test(code)) {
      setError('Invalid format. Tracking code must start with "TD"')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const binId = import.meta.env.VITE_JSONBIN_BIN_ID
      const apiKey = import.meta.env.VITE_JSONBIN_API_KEY
      const url = `https://api.jsonbin.io/v3/b/${binId}/latest`
      
      // ✅ Ajout de l'en-tête X-Access-Key pour Bin privé
      const response = await fetch(url, {
        headers: {
          'X-Access-Key': apiKey,
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      const shipments = data.record?.shipments || []
      
      const shipment = shipments.find(s => 
        s.trackingCode && s.trackingCode.toUpperCase() === code.toUpperCase()
      )
      
      if (shipment) {
        navigate(`/tracking/${shipment.id}`)
      } else {
        setError('No shipment found with this tracking code')
      }
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="tracking" className="section-padding bg-gradient-to-br from-orange-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Track Your Shipment
            </h1>
            <p className="text-xl text-gray-600">
              Enter your consignment number to get real-time tracking information
            </p>
          </div>

          {/* Tracking Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-orange-600 to-orange-400 px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Package className="w-6 h-6 mr-3" />
                Enter the Consignment No.
              </h2>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-gray-700">
                    <Search className="inline w-4 h-4 mr-2 text-orange-600" />
                    Tracking Number
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="Enter Tracking Number (e.g., TD7X9K2M4P1)"
                      className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition-all duration-200 placeholder-gray-400 bg-gray-50 focus:bg-white outline-none"
                      autoFocus
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <Search className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 animate-fade-in">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500">
                    <span className="text-lg mr-2">ℹ️</span>
                    Ex: TD7X9K2M4P1
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-700 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="inline w-5 h-5 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="inline w-5 h-5 mr-3" />
                      TRACK RESULT
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Get instant updates on your shipment status and location</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure &amp; Reliable</h3>
              <p className="text-gray-600">Your tracking information is protected and always accurate</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">Track your shipments on any device, anywhere, anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrackingForm