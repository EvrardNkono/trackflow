// src/pages/TrackingDetailsPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Package, Truck, CheckCircle, Clock, AlertCircle, 
  ArrowLeft, MapPin, Calendar, User, Phone, Mail,
  Map, Navigation, UserCheck, CalendarDays, Timer,
  ChevronRight, Circle, FileText, Flag, Shield, DollarSign,
  Thermometer, Building, AlertTriangle, Box, Info, XCircle,
  Search, Edit3, CreditCard, Wallet, Banknote, Bitcoin,
  Copy, Check, Eye, EyeOff, Receipt
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
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [copied, setCopied] = useState(false)

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

  // ✅ Statuts détaillés avec labels lisibles
  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      processing: 'Processing',
      'in-transit': 'In Transit',
      'out-for-delivery': 'Out for Delivery',
      delivered: 'Delivered',
      'customs-clearance': '🛃 Customs Clearance',
      'held-by-customs': '⛔ Held by Customs',
      'customs-inspection': '🔍 Customs Inspection',
      'additional-docs-required': '📄 Additional Docs Required',
      'cleared-customs': '✅ Cleared Customs',
      'address-issue': '📍 Address Issue',
      'incomplete-address': '⚠️ Incomplete Address',
      'incorrect-address': '❌ Incorrect Address',
      'security-check': '🔒 Security Check',
      'random-inspection': '🎲 Random Inspection',
      delayed: '⏰ Delayed',
      damaged: '💔 Damaged',
      lost: '❓ Lost',
      returned: '↩️ Returned',
      cancelled: '❌ Cancelled',
    }
    return labels[status] || status
  }

  const statusIcons = {
    pending: Clock,
    processing: Package,
    'in-transit': Truck,
    'out-for-delivery': Truck,
    delivered: CheckCircle,
    'customs-clearance': Shield,
    'held-by-customs': AlertCircle,
    'customs-inspection': Search,
    'additional-docs-required': FileText,
    'cleared-customs': CheckCircle,
    'address-issue': MapPin,
    'incomplete-address': MapPin,
    'incorrect-address': MapPin,
    'security-check': Shield,
    'random-inspection': Shield,
    delayed: Clock,
    damaged: AlertCircle,
    lost: AlertCircle,
    returned: Package,
    cancelled: XCircle,
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    'in-transit': 'bg-purple-100 text-purple-800 border-purple-200',
    'out-for-delivery': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    'customs-clearance': 'bg-violet-100 text-violet-800 border-violet-200',
    'held-by-customs': 'bg-red-100 text-red-800 border-red-200',
    'customs-inspection': 'bg-orange-100 text-orange-800 border-orange-200',
    'additional-docs-required': 'bg-amber-100 text-amber-800 border-amber-200',
    'cleared-customs': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'address-issue': 'bg-orange-100 text-orange-800 border-orange-200',
    'incomplete-address': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'incorrect-address': 'bg-red-100 text-red-800 border-red-200',
    'security-check': 'bg-slate-100 text-slate-800 border-slate-200',
    'random-inspection': 'bg-gray-100 text-gray-800 border-gray-200',
    delayed: 'bg-orange-100 text-orange-800 border-orange-200',
    damaged: 'bg-red-100 text-red-800 border-red-200',
    lost: 'bg-gray-100 text-gray-800 border-gray-200',
    returned: 'bg-gray-100 text-gray-800 border-gray-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
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

  // Fonction pour copier dans le presse-papier
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Rendu des détails de paiement
  const renderPaymentDetails = () => {
    const { paymentMethod, paymentDetails } = shipment
    if (!paymentMethod) return null

    switch (paymentMethod) {
      case 'bank-transfer':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
              <Banknote className="w-5 h-5" />
              Bank Transfer Details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Bank Name</span>
                <p className="font-medium text-gray-800">{paymentDetails?.bankName || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Account Holder</span>
                <p className="font-medium text-gray-800">{paymentDetails?.accountHolder || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-500">IBAN</span>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-medium text-gray-800 bg-white px-2 py-1 rounded border border-blue-200">
                    {paymentDetails?.iban || 'N/A'}
                  </p>
                  {paymentDetails?.iban && (
                    <button
                      onClick={() => copyToClipboard(paymentDetails.iban)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              {paymentDetails?.bic && (
                <div>
                  <span className="text-gray-500">BIC / SWIFT</span>
                  <p className="font-mono font-medium text-gray-800">{paymentDetails.bic}</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'paypal':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
              <Wallet className="w-5 h-5" />
              PayPal Details
            </div>
            <div>
              <span className="text-gray-500">PayPal Email</span>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-800 bg-white px-2 py-1 rounded border border-blue-200">
                  {paymentDetails?.paypalEmail || 'N/A'}
                </p>
                {paymentDetails?.paypalEmail && (
                  <button
                    onClick={() => copyToClipboard(paymentDetails.paypalEmail)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        )

      case 'crypto':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
              <Bitcoin className="w-5 h-5" />
              Crypto Details
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500">Cryptocurrency</span>
                <p className="font-medium text-gray-800 capitalize">{paymentDetails?.cryptoType || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <span className="text-gray-500">Wallet Address</span>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-medium text-gray-800 bg-white px-2 py-1 rounded border border-blue-200 text-xs break-all">
                    {paymentDetails?.cryptoWallet || 'N/A'}
                  </p>
                  {paymentDetails?.cryptoWallet && (
                    <button
                      onClick={() => copyToClipboard(paymentDetails.cryptoWallet)}
                      className="text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case 'cash':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
              <Banknote className="w-5 h-5" />
              Cash Details
            </div>
            <div>
              <span className="text-gray-500">Currency</span>
              <p className="font-medium text-gray-800">{paymentDetails?.cashCurrency || 'USD'}</p>
            </div>
          </div>
        )

      case 'other':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
            <div className="flex items-center gap-2 text-blue-700 font-semibold mb-3">
              <CreditCard className="w-5 h-5" />
              Custom Payment Method
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-500">Method</span>
                <p className="font-medium text-gray-800">{paymentDetails?.otherLabel || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Details</span>
                <p className="text-gray-700 bg-white p-2 rounded border border-blue-200 whitespace-pre-wrap">
                  {paymentDetails?.otherDetails || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent" />
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

  // Noms des méthodes de paiement pour l'affichage
  const paymentMethodLabels = {
    'bank-transfer': '🏦 Bank Transfer',
    'paypal': '💰 PayPal',
    'crypto': '₿ Crypto',
    'cash': '💵 Cash',
    'other': '🔗 Other'
  }

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
            <div className="flex items-center gap-3 flex-wrap">
              <div className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 ${statusColor}`}>
                <StatusIcon className="w-5 h-5" />
                <span className="font-semibold uppercase text-sm">{getStatusLabel(shipment.status)}</span>
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
          {shipment.statusDescription && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-gray-700 flex items-start gap-2">
                <Info className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>{shipment.statusDescription}</span>
              </p>
            </div>
          )}
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
                    width: shipment.status === 'pending' || shipment.status === 'processing' ? '15%' : 
                           shipment.status === 'in-transit' ? '40%' : 
                           shipment.status === 'customs-clearance' || shipment.status === 'held-by-customs' ? '50%' :
                           shipment.status === 'cleared-customs' ? '65%' :
                           shipment.status === 'out-for-delivery' ? '80%' : 
                           shipment.status === 'delivered' ? '100%' : '30%' 
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

        {/* 💳 SECTION PAIEMENT - MIS EN AVANT */}
        {shipment.paymentMethod && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white border-2 border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-full">
                    <CreditCard className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Payment Information</h3>
                    <p className="text-sm text-white/80">
                      {paymentMethodLabels[shipment.paymentMethod] || shipment.paymentMethod}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  {showPaymentDetails ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      View Details
                    </>
                  )}
                </button>
              </div>

              {showPaymentDetails && (
                <div className="mt-4 text-white">
                  {renderPaymentDetails()}
                </div>
              )}

              {/* Résumé rapide du paiement */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm border-t border-white/20 pt-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 opacity-80" />
                  <span className="opacity-80">Method:</span>
                  <span className="font-medium">{paymentMethodLabels[shipment.paymentMethod] || shipment.paymentMethod}</span>
                </div>
                {shipment.declaredValue && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 opacity-80" />
                    <span className="opacity-80">Amount:</span>
                    <span className="font-medium">${shipment.declaredValue}</span>
                  </div>
                )}
                {shipment.insuranceType && shipment.insuranceType !== 'none' && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 opacity-80" />
                    <span className="opacity-80">Insurance:</span>
                    <span className="font-medium capitalize">{shipment.insuranceType}</span>
                  </div>
                )}
              </div>

              {/* Badge de statut paiement */}
              <div className="mt-3">
                <span className="inline-flex items-center gap-1 bg-green-400/30 px-3 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Payment Confirmed
                </span>
              </div>
            </div>
          </div>
        )}

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

            {/* Status History avec descriptions détaillées */}
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
                      <p className="font-medium text-gray-900">{getStatusLabel(entry.status)}</p>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                      {entry.statusDetails && (
                        <p className="text-xs text-orange-600 mt-1 bg-orange-50 p-2 rounded-lg border border-orange-100">
                          📌 {entry.statusDetails}
                        </p>
                      )}
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

            {/* 📋 Additional Info - Références et notes internes */}
            {(shipment.referenceNumber || shipment.costCenter || shipment.internalNotes) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
                  Additional Information
                </h3>
                <div className="space-y-3 text-sm">
                  {shipment.referenceNumber && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Reference Number</span>
                      <span className="font-medium">{shipment.referenceNumber}</span>
                    </div>
                  )}
                  {shipment.costCenter && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-500">Cost Center</span>
                      <span className="font-medium">{shipment.costCenter}</span>
                    </div>
                  )}
                  {shipment.internalNotes && (
                    <div className="py-2">
                      <span className="text-gray-500 block mb-1">Internal Notes</span>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                        {shipment.internalNotes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  <span className="text-gray-500">Handling</span>
                  <span className="font-medium capitalize">{shipment.handlingInstructions || 'Standard'}</span>
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
                  {shipment.handlingInstructions && shipment.handlingInstructions !== 'Select handling...' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">🔧 {shipment.handlingInstructions}</span>
                  )}
                </div>
              </div>
            )}

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
    {/* ❌ SUPPRIMÉ : Email et Phone de l'expéditeur */}
    <div className="flex items-start gap-2">
      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
      <span className="text-gray-700">{shipment.senderAddress || 'N/A'}</span>
    </div>
  </div>
</div>

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