// src/admin/ShipmentDetails.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText,
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Shield, 
  Thermometer, 
  DollarSign,
  Flag, 
  Building, 
  CreditCard, 
  Info, 
  Edit3, 
  Save, 
  XCircle,
  Search, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Wallet, 
  Banknote, 
  Bitcoin, 
  Receipt,
  AlertTriangle // ✅ Ajouté
} from 'lucide-react'
import useShipments from '../hooks/useShipments'
import TrackingReceipt from '../components/TrackingReceipt'

const ShipmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { shipments, updateStatus, updateShipment, loading } = useShipments()
  const [shipment, setShipment] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [statusNote, setStatusNote] = useState('')
  const [statusDescription, setStatusDescription] = useState('')
  const [showReceipt, setShowReceipt] = useState(false)
  const [isEditingStatus, setIsEditingStatus] = useState(false)
  const [showPaymentDetails, setShowPaymentDetails] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const found = shipments.find(s => s.id === id)
    if (found) {
      setShipment(found)
      setNewStatus(found.status || 'pending')
      setStatusDescription(found.statusDescription || '')
    }
  }, [shipments, id])

  const handleStatusUpdate = async () => {
    if (!shipment) return
    
    const updated = await updateStatus(
      shipment.id,
      newStatus,
      shipment.currentLocation || 'Admin',
      statusNote || `Status changed to ${newStatus}`,
      statusDescription
    )
    
    if (updated) {
      setShipment(updated)
      setStatusNote('')
      setStatusDescription('')
      setIsEditingStatus(false)
      alert('✅ Status updated successfully!')
    }
  }

  // Fonction pour copier dans le presse-papier
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Statuts détaillés avec catégories
  const statusOptions = [
    // Normal
    { value: 'pending', label: 'Pending', category: 'normal' },
    { value: 'processing', label: 'Processing', category: 'normal' },
    { value: 'in-transit', label: 'In Transit', category: 'normal' },
    { value: 'out-for-delivery', label: 'Out for Delivery', category: 'normal' },
    { value: 'delivered', label: 'Delivered', category: 'done' },
    
    // Douane
    { value: 'customs-clearance', label: '🛃 Customs Clearance', category: 'customs' },
    { value: 'held-by-customs', label: '⛔ Held by Customs', category: 'customs' },
    { value: 'customs-inspection', label: '🔍 Customs Inspection', category: 'customs' },
    { value: 'additional-docs-required', label: '📄 Additional Docs Required', category: 'customs' },
    { value: 'cleared-customs', label: '✅ Cleared Customs', category: 'customs' },
    
    // Adresse
    { value: 'address-issue', label: '📍 Address Issue', category: 'address' },
    { value: 'incomplete-address', label: '⚠️ Incomplete Address', category: 'address' },
    { value: 'incorrect-address', label: '❌ Incorrect Address', category: 'address' },
    
    // Contrôle
    { value: 'security-check', label: '🔒 Security Check', category: 'security' },
    { value: 'random-inspection', label: '🎲 Random Inspection', category: 'security' },
    
    // Problèmes
    { value: 'delayed', label: '⏰ Delayed', category: 'problem' },
    { value: 'damaged', label: '💔 Damaged', category: 'problem' },
    { value: 'lost', label: '❓ Lost', category: 'problem' },
    { value: 'returned', label: '↩️ Returned', category: 'problem' },
    { value: 'cancelled', label: '❌ Cancelled', category: 'problem' },
  ]

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

  const getStatusLabel = (statusValue) => {
    const found = statusOptions.find(s => s.value === statusValue)
    return found ? found.label : statusValue
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 border-gray-200',
    normal: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
  }

  // Noms des méthodes de paiement
  const paymentMethodLabels = {
    'bank-transfer': '🏦 Bank Transfer',
    'paypal': '💰 PayPal',
    'crypto': '₿ Crypto',
    'cash': '💵 Cash',
    'other': '🔗 Other'
  }

  // Rendu des détails de paiement
  const renderPaymentDetails = () => {
    const { paymentMethod, paymentDetails } = shipment
    if (!paymentMethod) return null

    switch (paymentMethod) {
      case 'bank-transfer':
        return (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500">Bank</span>
                <p className="font-medium">{paymentDetails?.bankName || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Account Holder</span>
                <p className="font-medium">{paymentDetails?.accountHolder || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-500">IBAN</span>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-medium bg-white px-2 py-1 rounded border border-blue-200 text-xs">
                    {paymentDetails?.iban || 'N/A'}
                  </p>
                  {paymentDetails?.iban && (
                    <button
                      onClick={() => copyToClipboard(paymentDetails.iban)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
              {paymentDetails?.bic && (
                <div className="col-span-2">
                  <span className="text-gray-500">BIC/SWIFT</span>
                  <p className="font-mono font-medium">{paymentDetails.bic}</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'paypal':
        return (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
            <span className="text-gray-500">PayPal Email</span>
            <div className="flex items-center gap-2">
              <p className="font-medium">{paymentDetails?.paypalEmail || 'N/A'}</p>
              {paymentDetails?.paypalEmail && (
                <button
                  onClick={() => copyToClipboard(paymentDetails.paypalEmail)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        )

      case 'crypto':
        return (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-gray-500">Cryptocurrency</span>
                <p className="font-medium capitalize">{paymentDetails?.cryptoType || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Wallet Address</span>
                <div className="flex items-center gap-2">
                  <p className="font-mono font-medium bg-white px-2 py-1 rounded border border-blue-200 text-xs break-all">
                    {paymentDetails?.cryptoWallet || 'N/A'}
                  </p>
                  {paymentDetails?.cryptoWallet && (
                    <button
                      onClick={() => copyToClipboard(paymentDetails.cryptoWallet)}
                      className="text-blue-600 hover:text-blue-800 flex-shrink-0"
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
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
            <span className="text-gray-500">Currency</span>
            <p className="font-medium">{paymentDetails?.cashCurrency || 'USD'}</p>
          </div>
        )

      case 'other':
        return (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-gray-500">Method</span>
                <p className="font-medium">{paymentDetails?.otherLabel || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Details</span>
                <p className="text-gray-700 bg-white p-2 rounded border border-blue-200 whitespace-pre-wrap text-xs">
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

  if (loading || !shipment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  const StatusIcon = statusIcons[shipment.status] || Package
  const statusColor = statusColors[shipment.status] || 'bg-gray-100 text-gray-800 border-gray-200'

  // Grouper les statuts par catégorie
  const groupedStatuses = statusOptions.reduce((acc, status) => {
    if (!acc[status.category]) acc[status.category] = []
    acc[status.category].push(status)
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <div className="flex items-center gap-4">
          <Link to="/admin/shipments" className="text-orange-600 hover:text-orange-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Shipment Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowReceipt(true)}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Receipt className="w-4 h-4" />
            Receipt
          </button>
          <Link
            to={`/admin/update-shipment/${shipment.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Code */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Tracking Code</p>
                <p className="text-2xl font-mono font-bold text-orange-600">{shipment.trackingCode}</p>
              </div>
              <div className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 ${statusColor}`}>
                <StatusIcon className="w-4 h-4" />
                <span className="font-semibold uppercase text-sm">{getStatusLabel(shipment.status)}</span>
              </div>
            </div>
          </div>

          {/* 💳 SECTION PAIEMENT - MIS EN AVANT */}
          {shipment.paymentMethod && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Payment Information</h3>
                    <p className="text-sm text-white/80">
                      {paymentMethodLabels[shipment.paymentMethod] || shipment.paymentMethod}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  {showPaymentDetails ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      View
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

              <div className="mt-3">
                <span className="inline-flex items-center gap-1 bg-green-400/30 px-3 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Payment Confirmed
                </span>
              </div>
            </div>
          )}

          {/* Priority & Insurance Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md p-4">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Flag className="w-3 h-3" /> Priority
              </p>
              <p className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-semibold border ${priorityColors[shipment.priority] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                {shipment.priority || 'Normal'}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Insurance
              </p>
              <p className="mt-1 font-semibold text-sm capitalize">{shipment.insuranceType || 'None'}</p>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" />
              Status History
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {shipment.statusHistory?.map((entry, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-900">{getStatusLabel(entry.status)}</p>
                      <span className="text-xs text-gray-400">
                        {new Date(entry.date).toLocaleString()}
                      </span>
                    </div>
                    {entry.description && (
                      <p className="text-sm text-gray-600">{entry.description}</p>
                    )}
                    {entry.statusDetails && (
                      <p className="text-xs text-orange-600 mt-1 bg-orange-50 p-2 rounded border border-orange-100">
                        📌 {entry.statusDetails}
                      </p>
                    )}
                    {entry.location && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {entry.location}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Update Status</h3>
              {!isEditingStatus && (
                <button
                  onClick={() => setIsEditingStatus(true)}
                  className="text-orange-600 hover:text-orange-700 text-sm flex items-center gap-1"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              )}
            </div>
            
            {isEditingStatus ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    <option value="">Select a status...</option>
                    {Object.keys(groupedStatuses).map((category) => (
                      <optgroup key={category} label={category.toUpperCase()}>
                        {groupedStatuses[category].map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status Description <span className="text-xs text-gray-400">(Details about the status)</span>
                  </label>
                  <textarea
                    value={statusDescription}
                    onChange={(e) => setStatusDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                    placeholder="e.g., Package held by customs in France for documentation verification..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                  <textarea
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                    placeholder="Add a note about this status change..."
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleStatusUpdate}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingStatus(false)
                      setNewStatus(shipment.status || 'pending')
                      setStatusDescription(shipment.statusDescription || '')
                      setStatusNote('')
                    }}
                    className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Current Status</p>
                  <p className="font-semibold text-gray-900">{getStatusLabel(shipment.status)}</p>
                </div>
                {shipment.statusDescription && (
                  <div>
                    <p className="text-sm text-gray-500">Description</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      {shipment.statusDescription}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-sm text-gray-600">
                    {shipment.updatedAt ? new Date(shipment.updatedAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Shipment Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-orange-500" />
              Shipment Info
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">ID</span>
                <span className="font-mono text-gray-900 text-xs">{shipment.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Created</span>
                <span className="text-gray-900">{new Date(shipment.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Weight</span>
                <span className="text-gray-900">{shipment.weight || 'N/A'} kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Dimensions</span>
                <span className="text-gray-900">{shipment.dimensions || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Package Type</span>
                <span className="text-gray-900 capitalize">{shipment.packageType || 'Standard'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Delivery Type</span>
                <span className="text-gray-900 capitalize">{shipment.deliveryType || 'Standard'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Declared Value</span>
                <span className="text-gray-900">${shipment.declaredValue || '0.00'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Temperature</span>
                <span className="text-gray-900">{shipment.temperature || 'Ambient'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Handling</span>
                <span className="text-gray-900 capitalize">{shipment.handlingInstructions || 'Standard'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Current Location</span>
                <span className="text-gray-900">{shipment.currentLocation || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Courier</span>
                <span className="text-gray-900">{shipment.courierName || 'N/A'}</span>
              </div>
              {shipment.courierEmail && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Courier Email</span>
                  <span className="text-gray-900 text-xs">{shipment.courierEmail}</span>
                </div>
              )}
              {shipment.vehicleType && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Vehicle</span>
                  <span className="text-gray-900 capitalize">{shipment.vehicleType}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Reference #</span>
                <span className="text-gray-900">{shipment.referenceNumber || 'N/A'}</span>
              </div>
              {shipment.costCenter && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Cost Center</span>
                  <span className="text-gray-900">{shipment.costCenter}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sender Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="w-4 h-4 text-orange-500" />
              Sender
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Company</span>
                <span className="text-gray-900 font-medium">{shipment.senderCompany || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Tax ID</span>
                <span className="text-gray-900 font-mono text-xs">{shipment.senderTaxId || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-900">{shipment.senderName || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900 text-xs">{shipment.senderEmail || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-900">{shipment.senderPhone || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Address</span>
                <span className="text-gray-900 text-right text-xs">{shipment.senderAddress || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" />
              Recipient
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-900">{shipment.recipientName || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900 text-xs">{shipment.recipientEmail || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-900">{shipment.recipientPhone || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">City</span>
                <span className="text-gray-900">{shipment.recipientCity || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Postal Code</span>
                <span className="text-gray-900">{shipment.recipientPostalCode || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Country</span>
                <span className="text-gray-900">{shipment.recipientCountry || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Address</span>
                <span className="text-gray-900 text-right text-xs">{shipment.recipientAddress || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Special Flags */}
          {(shipment.isFragile || shipment.isHazardous || shipment.isPerishable || shipment.specialInstructions) && (
            <div className="bg-white rounded-xl shadow-md p-6 border-2 border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
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

          {/* Internal Notes */}
          {shipment.internalNotes && (
            <div className="bg-yellow-50 rounded-xl shadow-md p-6 border-2 border-yellow-200">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-yellow-600" />
                Internal Notes
              </h3>
              <p className="text-sm text-gray-700 italic whitespace-pre-wrap">{shipment.internalNotes}</p>
            </div>
          )}
        </div>
      </div>

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

export default ShipmentDetails