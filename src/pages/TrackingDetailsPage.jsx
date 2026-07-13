// src/pages/TrackingDetailsPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Package, Truck, CheckCircle, Clock, AlertCircle, 
  ArrowLeft, MapPin, Calendar, User, Phone, Mail,
  Map, Navigation, UserCheck, CalendarDays, Timer,
  ChevronRight, Circle, FileText, Flag, Shield, DollarSign,
  Thermometer, Building, AlertTriangle, Box, Info
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TrackingMap from '../components/TrackingMap'
import TrackingReceipt from '../components/TrackingReceipt'

const TrackingDetailsPage = () => {
  const { id } = useParams()
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState('')
  const [showReceipt, setShowReceipt] = useState(false)

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        const binId = import.meta.env.VITE_JSONBIN_BIN_ID
        const apiKey = import.meta.env.VITE_JSONBIN_API_KEY
        
        const response = await fetch(
          `https://api.jsonbin.io/v3/b/${binId}/latest`,
          {
            headers: {
              'X-Access-Key': apiKey,
              'Content-Type': 'application/json',
            }
          }
        )

        if (!response.ok) throw new Error('Failed to fetch shipment')
        
        const data = await response.json()
        const shipments = data.record?.shipments || []
        const found = shipments.find(s => s.id === id)
        
        if (found) {
          setShipment(found)
          calculateTimeRemaining(found.estimatedDelivery)
        } else {
          setError('Shipment not found')
        }
      } catch (err) {
        setError('An error occurred. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchShipment()
  }, [id])

  const calculateTimeRemaining = (estimatedDate) => {
    if (!estimatedDate) return
    const now = new Date()
    const target = new Date(estimatedDate)
    const diff = target - now
    
    if (diff <= 0) {
      setTimeRemaining('Delivery today')
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      setTimeRemaining(`${days}d ${hours}h`)
    } else if (hours > 0) {
      setTimeRemaining(`${hours}h ${minutes}min`)
    } else {
      setTimeRemaining(`${minutes}min`)
    }
  }

  useEffect(() => {
    if (shipment?.estimatedDelivery) {
      const interval = setInterval(() => {
        calculateTimeRemaining(shipment.estimatedDelivery)
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [shipment])

  const statusIcons = {
    pending: Clock,
    'in-transit': Truck,
    delivered: CheckCircle,
    delayed: AlertCircle,
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'in-transit': 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    delayed: 'bg-red-100 text-red-800 border-red-200',
  }

  const statusLabels = {
    pending: 'Pending',
    'in-transit': 'In Transit',
    delivered: 'Delivered',
    delayed: 'Delayed',
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-600',
    normal: 'bg-blue-100 text-blue-600',
    high: 'bg-orange-100 text-orange-600',
    urgent: 'bg-red-100 text-red-600',
  }

  const priorityLabels = {
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    urgent: '🔴 Urgent',
  }

  const getPriorityClass = (priority) => {
    return priorityColors[priority] || 'bg-gray-100 text-gray-600'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !shipment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 container-custom py-16">
          <div className="text-center max-w-lg mx-auto">
            <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipment Not Found</h2>
            <p className="text-gray-600 mb-6">{error || 'No shipment found.'}</p>
            <Link to="/" className="text-orange-600 hover:text-orange-700 font-semibold">
              ← Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const StatusIcon = statusIcons[shipment.status] || Package
  const statusColor = statusColors[shipment.status] || 'bg-gray-100 text-gray-800'

  const mapUrl = shipment.currentLatitude && shipment.currentLongitude
    ? `https://www.google.com/maps?q=${shipment.currentLatitude},${shipment.currentLongitude}`
    : `https://www.google.com/maps/search/${encodeURIComponent(shipment.currentLocation || '')}`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container-custom py-8 md:py-12">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tracking
        </Link>

        {/* Tracking Code & Status */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Tracking Code</p>
              <h1 className="text-2xl md:text-3xl font-mono font-bold text-orange-600">
                {shipment.trackingCode}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 ${statusColor}`}>
                <StatusIcon className="w-5 h-5" />
                <span className="font-semibold uppercase text-sm">{statusLabels[shipment.status] || shipment.status}</span>
              </div>
              <button
                onClick={() => setShowReceipt(true)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-6 h-6 text-orange-500" />
              <span className="text-sm text-gray-600">Progress</span>
            </div>
            <div className="flex-1 w-full">
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-1000"
                  style={{ 
                    width: shipment.status === 'pending' ? '25%' : 
                           shipment.status === 'in-transit' ? '60%' : 
                           shipment.status === 'delivered' ? '100%' : '40%' 
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600">Created</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className="text-gray-600">In Transit</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
              <span className={`font-semibold ${shipment.status === 'delivered' ? 'text-green-600' : 'text-gray-400'}`}>
                Delivered
              </span>
            </div>
          </div>
        </div>

        {/* Time Remaining & Priority */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl shadow-lg p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <Timer className="w-8 h-8" />
              <div>
                <p className="text-sm opacity-90">Estimated time remaining</p>
                <p className="text-2xl font-bold">{timeRemaining || 'Calculating...'}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90">Estimated delivery date</p>
              <p className="text-lg font-semibold">
                {shipment.estimatedDelivery 
                  ? new Date(shipment.estimatedDelivery).toLocaleDateString('en-US', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Not set'
                }
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Flag className="w-4 h-4" />
              <span className="text-sm font-medium">
                Priority: {priorityLabels[shipment.priority] || 'Normal'}
              </span>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 🗺️ Carte interactive Leaflet */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Map className="w-5 h-5 text-orange-500" />
                  Current Location
                </h3>
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 text-sm flex items-center gap-1"
                >
                  Open in Google Maps
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="p-4">
                <TrackingMap shipment={shipment} />
                
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-orange-500 rounded-full border border-white shadow-sm inline-block"></span>
                    Current position
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 bg-green-500 rounded-full border border-white shadow-sm inline-block"></span>
                    Destination
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-0.5 bg-orange-500 inline-block"></span>
                    Route
                  </span>
                  {shipment.currentLocation && (
                    <>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-600">
                        📍 {shipment.currentLocation}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Tracking History
              </h3>
              <div className="space-y-4">
                {shipment.statusHistory?.map((entry, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="relative">
                      <div className={`w-3 h-3 mt-1.5 rounded-full ${index === 0 ? 'bg-orange-500' : 'bg-gray-300'}`} />
                      {index < shipment.statusHistory.length - 1 && (
                        <div className="absolute top-5 left-1.5 w-0.5 h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium text-gray-900">{entry.status}</p>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3" />
                        {entry.location}
                        {entry.latitude && entry.longitude && (
                          <span className="text-gray-300">•</span>
                        )}
                        {entry.latitude && entry.longitude && (
                          <span className="text-gray-400">GPS: {entry.latitude}, {entry.longitude}</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(entry.date).toLocaleString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite (1/3) */}
          <div className="space-y-6">
            {/* Courier */}
            {(shipment.courierName || shipment.courierEmail || shipment.vehicleType) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-orange-500" />
                  Courier
                </h3>
                {shipment.courierName && (
                  <p className="font-medium text-gray-900">{shipment.courierName}</p>
                )}
                {shipment.courierEmail && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Mail className="w-3 h-3" />
                    {shipment.courierEmail}
                  </p>
                )}
                {shipment.vehicleType && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Truck className="w-3 h-3" />
                    {shipment.vehicleType}
                  </p>
                )}
              </div>
            )}

            {/* Shipment Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-500" />
                Shipment Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Weight</span>
                  <span className="font-medium">{shipment.weight || 'N/A'} kg</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Dimensions</span>
                  <span className="font-medium">{shipment.dimensions || 'N/A'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Package Type</span>
                  <span className="font-medium capitalize">{shipment.packageType || 'Standard'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Delivery Type</span>
                  <span className="font-medium capitalize">{shipment.deliveryType || 'Standard'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Priority</span>
                  <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${getPriorityClass(shipment.priority)}`}>
                    {priorityLabels[shipment.priority] || 'Normal'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-medium capitalize">{shipment.insuranceType || 'None'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Declared Value</span>
                  <span className="font-medium">${shipment.declaredValue || '0.00'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Temperature</span>
                  <span className="font-medium">{shipment.temperature || 'Ambient'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium">{new Date(shipment.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Current Location</span>
                  <span className="font-medium text-right">{shipment.currentLocation || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Sender Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-orange-500" />
                Sender
              </h3>
              <div className="space-y-2 text-sm">
                {shipment.senderCompany && (
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-700 font-medium">{shipment.senderCompany}</span>
                  </div>
                )}
                {shipment.senderTaxId && (
                  <div className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-4 h-4" />
                    <span className="font-mono">Tax ID: {shipment.senderTaxId}</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.senderName || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.senderEmail || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.senderPhone || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.senderAddress || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Special Flags */}
            {(shipment.isFragile || shipment.isHazardous || shipment.isPerishable || shipment.specialInstructions) && (
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Special Instructions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shipment.isFragile && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">🔴 Fragile</span>
                  )}
                  {shipment.isHazardous && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">☣️ Hazardous</span>
                  )}
                  {shipment.isPerishable && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">🧊 Perishable</span>
                  )}
                  {shipment.specialInstructions && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">📋 {shipment.specialInstructions}</span>
                  )}
                  {shipment.temperature && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">🌡️ {shipment.temperature}</span>
                  )}
                </div>
              </div>
            )}

            {/* Recipient */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                Recipient
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.recipientName || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.recipientEmail || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.recipientPhone || 'N/A'}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-700">{shipment.recipientAddress || 'N/A'}</span>
                </div>
                {shipment.recipientCity && (
                  <div className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="w-4 h-4" />
                    <span>{shipment.recipientCity}{shipment.recipientPostalCode ? `, ${shipment.recipientPostalCode}` : ''}{shipment.recipientCountry ? `, ${shipment.recipientCountry}` : ''}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Receipt Modal */}
      {showReceipt && (
        <TrackingReceipt
          shipment={shipment}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  )
}

export default TrackingDetailsPage