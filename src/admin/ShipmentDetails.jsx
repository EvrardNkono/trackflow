// src/admin/ShipmentDetails.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, Package, Truck, CheckCircle, Clock, AlertCircle, FileText,
  MapPin, User, Phone, Mail, Calendar, Shield, Thermometer, DollarSign,
  Flag, Building, CreditCard, Info
} from 'lucide-react'
import useShipments from '../hooks/useShipments'
import TrackingReceipt from '../components/TrackingReceipt'

const ShipmentDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { shipments, updateStatus, loading } = useShipments()
  const [shipment, setShipment] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [statusNote, setStatusNote] = useState('')
  const [showReceipt, setShowReceipt] = useState(false)

  useEffect(() => {
    const found = shipments.find(s => s.id === id)
    if (found) {
      setShipment(found)
      setNewStatus(found.status || 'pending')
    }
  }, [shipments, id])

  const handleStatusUpdate = async () => {
    if (!shipment) return
    
    const updated = await updateStatus(
      shipment.id,
      newStatus,
      'Updated by admin',
      statusNote || `Status changed to ${newStatus}`
    )
    
    if (updated) {
      setShipment(updated)
      setStatusNote('')
      alert('✅ Status updated successfully!')
    }
  }

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

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800 border-gray-200',
    normal: 'bg-blue-100 text-blue-800 border-blue-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
  }

  if (loading || !shipment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  const StatusIcon = statusIcons[shipment.status] || Package

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/shipments" className="text-orange-600 hover:text-orange-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Shipment Details</h1>
        </div>
        <button
          onClick={() => setShowReceipt(true)}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <FileText className="w-4 h-4" />
          Receipt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tracking Code */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tracking Code</p>
                <p className="text-2xl font-mono font-bold text-orange-600">{shipment.trackingCode}</p>
              </div>
              <div className={`px-4 py-2 rounded-full border-2 flex items-center gap-2 ${statusColors[shipment.status] || 'bg-gray-100 text-gray-800'}`}>
                <StatusIcon className="w-4 h-4" />
                <span className="font-semibold uppercase text-sm">{shipment.status || 'Unknown'}</span>
              </div>
            </div>
          </div>

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
            <h3 className="font-semibold text-gray-900 mb-4">Status History</h3>
            <div className="space-y-3">
              {shipment.statusHistory?.map((entry, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">{entry.status}</p>
                    <p className="text-sm text-gray-500">{entry.description}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(entry.date).toLocaleString()}
                    </p>
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
            <h3 className="font-semibold text-gray-900 mb-4">Update Status</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                </select>
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

              <button
                onClick={handleStatusUpdate}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                Update Status
              </button>
            </div>
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
                <span className="font-mono text-gray-900">{shipment.id}</span>
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
                  <span className="text-gray-900">{shipment.courierEmail}</span>
                </div>
              )}
              {shipment.vehicleType && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Vehicle</span>
                  <span className="text-gray-900 capitalize">{shipment.vehicleType}</span>
                </div>
              )}
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Reference #</span>
                <span className="text-gray-900">{shipment.referenceNumber || 'N/A'}</span>
              </div>
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
                <span className="text-gray-900">{shipment.senderEmail || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Phone</span>
                <span className="text-gray-900">{shipment.senderPhone || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Address</span>
                <span className="text-gray-900 text-right">{shipment.senderAddress || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Client Info */}
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
                <span className="text-gray-900">{shipment.recipientEmail || 'N/A'}</span>
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
                <span className="text-gray-900 text-right">{shipment.recipientAddress || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Special Flags */}
          {(shipment.isFragile || shipment.isHazardous || shipment.isPerishable) && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-3">⚠️ Special Flags</h3>
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
                {shipment.handlingInstructions && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">📋 {shipment.handlingInstructions}</span>
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
              <p className="text-sm text-gray-700 italic">{shipment.internalNotes}</p>
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