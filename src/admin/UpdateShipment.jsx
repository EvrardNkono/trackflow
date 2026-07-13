// src/admin/UpdateShipment.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, Package, Truck, MapPin, User, Phone, Calendar, Clock,
  Flag, Shield, DollarSign, Thermometer, Building, CreditCard, Info,
  CheckSquare, Square, AlertTriangle, Box
} from 'lucide-react'
import useShipments from '../hooks/useShipments'

const UpdateShipment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { shipments, updateStatus, updateLocation, updateEstimatedDelivery, updateCourier, loading } = useShipments()
  const [shipment, setShipment] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    status: 'pending',
    currentLocation: '',
    currentLatitude: '',
    currentLongitude: '',
    estimatedDelivery: '',
    courierName: '',
    courierEmail: '',
    vehicleType: '',
    statusNote: '',
    priority: 'normal',
    insuranceType: 'none',
    declaredValue: '',
    temperature: '',
    specialInstructions: '',
    isFragile: false,
    isHazardous: false,
    isPerishable: false,
  })

  useEffect(() => {
    const found = shipments.find(s => s.id === id)
    if (found) {
      setShipment(found)
      setFormData({
        status: found.status || 'pending',
        currentLocation: found.currentLocation || '',
        currentLatitude: found.currentLatitude || '',
        currentLongitude: found.currentLongitude || '',
        estimatedDelivery: found.estimatedDelivery || '',
        courierName: found.courierName || '',
        courierEmail: found.courierEmail || '',
        vehicleType: found.vehicleType || '',
        statusNote: '',
        priority: found.priority || 'normal',
        insuranceType: found.insuranceType || 'none',
        declaredValue: found.declaredValue || '',
        temperature: found.temperature || '',
        specialInstructions: found.specialInstructions || '',
        isFragile: found.isFragile || false,
        isHazardous: found.isHazardous || false,
        isPerishable: found.isPerishable || false,
      })
    }
  }, [shipments, id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Mise à jour du statut
      if (formData.status !== shipment.status) {
        await updateStatus(
          id,
          formData.status,
          formData.currentLocation || shipment.currentLocation,
          formData.statusNote || `Status changed to ${formData.status}`
        )
      }

      // Mise à jour de la position
      if (formData.currentLocation !== shipment.currentLocation) {
        await updateLocation(
          id,
          formData.currentLocation,
          parseFloat(formData.currentLatitude) || null,
          parseFloat(formData.currentLongitude) || null
        )
      }

      // Mise à jour de la date d'arrivée
      if (formData.estimatedDelivery !== shipment.estimatedDelivery) {
        await updateEstimatedDelivery(id, formData.estimatedDelivery)
      }

      // Mise à jour du livreur
      if (formData.courierName !== shipment.courierName || 
          formData.courierEmail !== shipment.courierEmail || 
          formData.vehicleType !== shipment.vehicleType) {
        await updateCourier(id, formData.courierName, formData.courierEmail, formData.vehicleType)
      }

      alert('✅ Shipment updated successfully!')
      navigate('/admin/shipments')
    } catch (error) {
      console.error('Error updating shipment:', error)
      alert('❌ Error updating shipment')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading || !shipment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'in-transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'delayed', label: 'Delayed' },
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: '🔴 Urgent' },
  ]

  const insuranceOptions = [
    { value: 'none', label: 'None' },
    { value: 'basic', label: 'Basic' },
    { value: 'standard', label: 'Standard' },
    { value: 'premium', label: 'Premium' },
    { value: 'full', label: 'Full Coverage' },
  ]

  const vehicleOptions = [
    { value: '', label: 'Select vehicle...' },
    { value: 'van', label: '🚐 Delivery Van' },
    { value: 'truck', label: '🚛 Truck' },
    { value: 'motorcycle', label: '🏍️ Motorcycle' },
    { value: 'bicycle', label: '🚲 Bicycle' },
    { value: 'car', label: '🚗 Car' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/shipments" className="text-orange-600 hover:text-orange-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Update Shipment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Tracking Code */}
            <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
              <div className="flex items-center gap-4">
                <Package className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Tracking Code</p>
                  <p className="text-lg font-mono font-bold text-orange-600">{shipment.trackingCode}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status Note
              </label>
              <input
                type="text"
                name="statusNote"
                value={formData.statusNote}
                onChange={handleChange}
                placeholder="e.g., Package left warehouse"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>

            {/* Location */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Location
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    placeholder="e.g., Los Angeles, CA"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GPS Coordinates (optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="currentLatitude"
                      value={formData.currentLatitude}
                      onChange={handleChange}
                      step="any"
                      placeholder="Latitude"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                    <input
                      type="number"
                      name="currentLongitude"
                      value={formData.currentLongitude}
                      onChange={handleChange}
                      step="any"
                      placeholder="Longitude"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery & Insurance */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Delivery & Insurance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Delivery
                  </label>
                  <input
                    type="datetime-local"
                    name="estimatedDelivery"
                    value={formData.estimatedDelivery}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Insurance
                  </label>
                  <select
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    {insuranceOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Declared Value (USD)
                  </label>
                  <input
                    type="number"
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleChange}
                    step="0.01"
                    placeholder="500.00"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Temperature & Special Instructions */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-orange-500" />
                Special Conditions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="text"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    placeholder="e.g., 2-8°C, -20°C, Ambient"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <input
                    type="text"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    placeholder="Any special instructions..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Special Flags */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Special Flags
              </h3>
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="isFragile"
                    checked={formData.isFragile}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  🔴 Fragile
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="isHazardous"
                    checked={formData.isHazardous}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  ☣️ Hazardous
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="isPerishable"
                    checked={formData.isPerishable}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  🧊 Perishable
                </label>
              </div>
            </div>

            {/* Courier */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Courier
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courier Name
                  </label>
                  <input
                    type="text"
                    name="courierName"
                    value={formData.courierName}
                    onChange={handleChange}
                    placeholder="e.g., Martin Marin"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Courier Email
                  </label>
                  <input
                    type="email"
                    name="courierEmail"
                    value={formData.courierEmail}
                    onChange={handleChange}
                    placeholder="martin@trackflow.com"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    {vehicleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t pt-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin/shipments')}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Shipment'}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar - Shipment Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Current Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Status</span>
                <span className="font-medium capitalize">{shipment.status || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Priority</span>
                <span className="font-medium capitalize">{shipment.priority || 'Normal'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Location</span>
                <span className="font-medium">{shipment.currentLocation || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Delivery</span>
                <span className="font-medium">
                  {shipment.estimatedDelivery 
                    ? new Date(shipment.estimatedDelivery).toLocaleDateString()
                    : 'N/A'
                  }
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Insurance</span>
                <span className="font-medium capitalize">{shipment.insuranceType || 'None'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Courier</span>
                <span className="font-medium">{shipment.courierName || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Vehicle</span>
                <span className="font-medium capitalize">{shipment.vehicleType || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Created</span>
                <span className="font-medium">
                  {new Date(shipment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl shadow-lg p-6 border-2 border-orange-200">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Quick Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Update status when package moves</li>
              <li>• Add GPS coordinates for precise tracking</li>
              <li>• Set estimated delivery date</li>
              <li>• Assign courier and vehicle</li>
              <li>• Set priority for urgent shipments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateShipment