// src/admin/UpdateShipment.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ArrowLeft, Package, Truck, MapPin, User, Phone, Calendar, Clock,
  Flag, Shield, DollarSign, Thermometer, Building, CreditCard, Info,
  CheckSquare, Square, AlertTriangle, Box, CheckCircle, XCircle,
  Mail
} from 'lucide-react'
import useShipments from '../hooks/useShipments'

const UpdateShipment = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { shipments, updateShipment, loading } = useShipments()
  const [shipment, setShipment] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // 📦 Product Info
    productName: '',
    productDescription: '',
    
    // 📍 Location & Delivery
    currentLocation: '',
    currentLatitude: '',
    currentLongitude: '',
    estimatedDelivery: '',
    departureDateTime: '',
    
    // 📤 Sender
    senderCompany: 'DHL',
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: '',
    senderTaxId: '',
    
    // 📬 Recipient
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientCity: '',
    recipientPostalCode: '',
    recipientCountry: 'United States',
    
    // 📦 Package Details
    weight: '',
    dimensions: '',
    packageType: 'standard',
    deliveryType: 'standard',
    deliveryDate: '',
    declaredValue: '',
    insuranceType: 'none',
    handlingInstructions: '',
    specialInstructions: '',
    temperature: '',
    isHazardous: false,
    isFragile: false,
    isPerishable: false,
    
    // 🚚 Courier
    courierName: '',
    courierEmail: '',
    vehicleType: '',
    
    // 💳 Payment Methods
    paymentMethod: 'bank-transfer',
    paymentStatus: 'pending',
    paymentDetails: {
      bankName: '',
      accountHolder: '',
      iban: '',
      bic: '',
      paypalEmail: '',
      cryptoWallet: '',
      cryptoType: 'bitcoin',
      cashCurrency: 'USD',
      otherLabel: '',
      otherDetails: '',
      contactEmail: 'contact@trackflow.com',
      contactMessage: '',
      bankInfoPartial: '',
      accountNumberPartial: '',
      referenceCode: '',
    },
    
    // 🐾 Animal Transport
    isAnimalTransport: false,
    animalName: '',
    animalType: '',
    animalBreed: '',
    animalQuantity: '',
    animalWeight: '',
    animalAge: '',
    animalVaccination: false,
    animalHealthCertificate: '',
    animalCageType: '',
    animalFeedingInstructions: '',
    animalSpecialNeeds: '',
    
    // 📋 Additional Info
    referenceNumber: '',
    costCenter: '',
    internalNotes: '',
    priority: 'normal',
    
    // 📊 Status
    status: 'pending',
    statusNote: '',
  })

  const isAnimal = formData.isAnimalTransport

  // ✅ Effet pour auto-remplir productName avec animalName
  useEffect(() => {
    if (isAnimal && formData.animalName) {
      setFormData(prev => ({
        ...prev,
        productName: formData.animalName
      }))
    }
  }, [formData.isAnimalTransport, formData.animalName])

  // 🏢 Liste des 15 entreprises expéditrices premium
  const senderCompanies = [
    { value: 'DHL', label: 'DHL Express' },
    { value: 'FedEx', label: 'FedEx International' },
    { value: 'UPS', label: 'UPS Worldwide' },
    { value: 'USPS', label: 'USPS Priority' },
    { value: 'Amazon Logistics', label: 'Amazon Logistics' },
    { value: 'TNT', label: 'TNT Express' },
    { value: 'DB Schenker', label: 'DB Schenker Logistics' },
    { value: 'Kuehne + Nagel', label: 'Kuehne + Nagel' },
    { value: 'DSV', label: 'DSV Global Transport' },
    { value: 'XPO Logistics', label: 'XPO Logistics' },
    { value: 'Yamato Transport', label: 'Yamato Transport' },
    { value: 'Nippon Express', label: 'Nippon Express' },
    { value: 'Toll Group', label: 'Toll Group' },
    { value: 'Maersk', label: 'Maersk Logistics' },
    { value: 'Trans Dispatch', label: '⭐ Trans Dispatch Premium' },
  ]

  // 💳 Modes de paiement disponibles
  const paymentMethods = [
    { value: 'bank-transfer', label: '🏦 Bank Transfer' },
    { value: 'paypal', label: '💰 PayPal' },
    { value: 'crypto', label: '₿ Crypto' },
    { value: 'cash', label: '💵 Cash' },
    { value: 'other', label: '🔗 Other' },
    { value: 'contact-email', label: '📧 Contact us by Email' },
  ]

  const cryptoTypes = [
    { value: 'bitcoin', label: '₿ Bitcoin (BTC)' },
    { value: 'ethereum', label: '⟠ Ethereum (ETH)' },
    { value: 'usdt', label: '💵 Tether (USDT)' },
    { value: 'usdc', label: '💵 USD Coin (USDC)' },
    { value: 'bnb', label: '🟡 BNB' },
    { value: 'solana', label: '◎ Solana (SOL)' },
    { value: 'ripple', label: '✕ Ripple (XRP)' },
    { value: 'cardano', label: '₳ Cardano (ADA)' },
    { value: 'polkadot', label: '● Polkadot (DOT)' },
    { value: 'dogecoin', label: '🐕 Dogecoin (DOGE)' },
  ]

  const statusOptions = [
    { value: 'pending', label: '⏳ Pending' },
    { value: 'processing', label: '🔄 Processing' },
    { value: 'in-transit', label: '🚚 In Transit' },
    { value: 'delivered', label: '✅ Delivered' },
    { value: 'delayed', label: '⚠️ Delayed' },
    { value: 'cancelled', label: '❌ Cancelled' },
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: '🔴 Urgent' },
  ]

  const paymentStatusOptions = [
    { value: 'pending', label: '⏳ Pending' },
    { value: 'confirmed', label: '✅ Confirmed' },
    { value: 'failed', label: '❌ Failed' },
    { value: 'refunded', label: '↩️ Refunded' },
  ]

  const insuranceOptions = [
    { value: 'none', label: '❌ None' },
    { value: 'basic', label: '🛡️ Basic' },
    { value: 'standard', label: '🛡️ Standard' },
    { value: 'premium', label: '🛡️ Premium' },
    { value: 'full', label: '🛡️ Full Coverage' },
  ]

  const vehicleOptions = [
    { value: '', label: 'Select vehicle...' },
    { value: 'van', label: '🚐 Delivery Van' },
    { value: 'truck', label: '🚛 Truck' },
    { value: 'motorcycle', label: '🏍️ Motorcycle' },
    { value: 'bicycle', label: '🚲 Bicycle' },
    { value: 'car', label: '🚗 Car' },
  ]

  const COMPANY_DATA = {
    'DHL': { 
      senderName: 'DHL Express', 
      senderAddress: '1200 South Pine Island Rd, Plantation, FL 33324',
      senderTaxId: 'DE-813729405'
    },
    'FedEx': { 
      senderName: 'FedEx International', 
      senderAddress: '942 South Shady Grove Road, Memphis, TN 38120',
      senderTaxId: 'US-627184593'
    },
    'UPS': { 
      senderName: 'UPS Worldwide', 
      senderAddress: '55 Glenlake Parkway NE, Atlanta, GA 30328',
      senderTaxId: 'US-549237816'
    },
    'USPS': { 
      senderName: 'USPS Priority', 
      senderAddress: '475 L\'Enfant Plaza SW, Washington, DC 20260',
      senderTaxId: 'US-384719265'
    },
    'Amazon Logistics': { 
      senderName: 'Amazon Logistics', 
      senderAddress: '410 Terry Ave N, Seattle, WA 98109',
      senderTaxId: 'US-927461538'
    },
    'TNT': { 
      senderName: 'TNT Express', 
      senderAddress: 'TNT Centre, 2132 LR Hoofddorp, Netherlands',
      senderTaxId: 'NL-836492715'
    },
    'DB Schenker': { 
      senderName: 'DB Schenker Logistics', 
      senderAddress: 'Kruppstraße 4, 45128 Essen, Germany',
      senderTaxId: 'DE-728394615'
    },
    'Kuehne + Nagel': { 
      senderName: 'Kuehne + Nagel', 
      senderAddress: 'Dorfstrasse 50, 8834 Schindellegi, Switzerland',
      senderTaxId: 'CH-493827156'
    },
    'DSV': { 
      senderName: 'DSV Global Transport', 
      senderAddress: 'Hovedgaden 630, 2640 Hedehusene, Denmark',
      senderTaxId: 'DK-572948316'
    },
    'XPO Logistics': { 
      senderName: 'XPO Logistics', 
      senderAddress: '5 American Lane, Greenwich, CT 06831',
      senderTaxId: 'US-641738592'
    },
    'Yamato Transport': { 
      senderName: 'Yamato Transport', 
      senderAddress: '2-1-1 Shinkawa, Chuo-ku, Tokyo 104-0033, Japan',
      senderTaxId: 'JP-382947156'
    },
    'Nippon Express': { 
      senderName: 'Nippon Express', 
      senderAddress: '2-3-1 Higashi-Shimbashi, Minato-ku, Tokyo 105-8315, Japan',
      senderTaxId: 'JP-615847293'
    },
    'Toll Group': { 
      senderName: 'Toll Group', 
      senderAddress: '380 St Kilda Road, Melbourne, VIC 3004, Australia',
      senderTaxId: 'AU-748392615'
    },
    'Maersk': { 
      senderName: 'Maersk Logistics', 
      senderAddress: 'Esplanaden 50, 1263 Copenhagen K, Denmark',
      senderTaxId: 'DK-637194825'
    },
    'Trans Dispatch': { 
      senderName: 'Trans Dispatch Premium', 
      senderAddress: '123 Logistics Drive, New York, NY 10001',
      senderTaxId: 'US-736194528'
    }
  }

  useEffect(() => {
    const found = shipments.find(s => s.id === id)
    if (found) {
      setShipment(found)
      setFormData({
        productName: found.productName || '',
        productDescription: found.productDescription || '',
        currentLocation: found.currentLocation || '',
        currentLatitude: found.currentLatitude || '',
        currentLongitude: found.currentLongitude || '',
        estimatedDelivery: found.estimatedDelivery || '',
        departureDateTime: found.departureDateTime || '',
        senderCompany: found.senderCompany || 'DHL',
        senderName: found.senderName || '',
        senderEmail: found.senderEmail || '',
        senderPhone: found.senderPhone || '',
        senderAddress: found.senderAddress || '',
        senderTaxId: found.senderTaxId || '',
        recipientName: found.recipientName || '',
        recipientEmail: found.recipientEmail || '',
        recipientPhone: found.recipientPhone || '',
        recipientAddress: found.recipientAddress || '',
        recipientCity: found.recipientCity || '',
        recipientPostalCode: found.recipientPostalCode || '',
        recipientCountry: found.recipientCountry || 'United States',
        weight: found.weight || '',
        dimensions: found.dimensions || '',
        packageType: found.packageType || 'standard',
        deliveryType: found.deliveryType || 'standard',
        deliveryDate: found.deliveryDate || '',
        declaredValue: found.declaredValue || '',
        insuranceType: found.insuranceType || 'none',
        handlingInstructions: found.handlingInstructions || '',
        specialInstructions: found.specialInstructions || '',
        temperature: found.temperature || '',
        isHazardous: found.isHazardous || false,
        isFragile: found.isFragile || false,
        isPerishable: found.isPerishable || false,
        courierName: found.courierName || '',
        courierEmail: found.courierEmail || '',
        vehicleType: found.vehicleType || '',
        paymentMethod: found.paymentMethod || 'bank-transfer',
        paymentStatus: found.paymentStatus || 'pending',
        paymentDetails: found.paymentDetails || {
          bankName: '',
          accountHolder: '',
          iban: '',
          bic: '',
          paypalEmail: '',
          cryptoWallet: '',
          cryptoType: 'bitcoin',
          cashCurrency: 'USD',
          otherLabel: '',
          otherDetails: '',
          contactEmail: 'contact@trackflow.com',
          contactMessage: '',
          bankInfoPartial: '',
          accountNumberPartial: '',
          referenceCode: '',
        },
        isAnimalTransport: found.isAnimalTransport || false,
        animalName: found.animalName || '',
        animalType: found.animalType || '',
        animalBreed: found.animalBreed || '',
        animalQuantity: found.animalQuantity || '',
        animalWeight: found.animalWeight || '',
        animalAge: found.animalAge || '',
        animalVaccination: found.animalVaccination || false,
        animalHealthCertificate: found.animalHealthCertificate || '',
        animalCageType: found.animalCageType || '',
        animalFeedingInstructions: found.animalFeedingInstructions || '',
        animalSpecialNeeds: found.animalSpecialNeeds || '',
        referenceNumber: found.referenceNumber || '',
        costCenter: found.costCenter || '',
        internalNotes: found.internalNotes || '',
        priority: found.priority || 'normal',
        status: found.status || 'pending',
        statusNote: '',
      })
    }
  }, [shipments, id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    
    setFormData(prev => {
      const updated = { 
        ...prev, 
        [name]: newValue 
      }
      
      // 🐾 Si on change le nom de l'animal ET que c'est un transport d'animal
      if (name === 'animalName' && updated.isAnimalTransport && newValue) {
        updated.productName = newValue
      }
      
      // 🐾 Si on active/désactive le transport d'animal
      if (name === 'isAnimalTransport') {
        if (newValue && updated.animalName) {
          updated.productName = updated.animalName
        } else if (!newValue && updated.productName === updated.animalName) {
          updated.productName = ''
        }
      }
      
      return updated
    })
  }

  const handlePaymentDetailChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      paymentDetails: {
        ...prev.paymentDetails,
        [name]: value
      }
    }))
  }

  const handlePaymentMethodChange = (e) => {
    const value = e.target.value
    setFormData(prev => ({
      ...prev,
      paymentMethod: value,
      paymentDetails: {
        bankName: '',
        accountHolder: '',
        iban: '',
        bic: '',
        paypalEmail: '',
        cryptoWallet: '',
        cryptoType: 'bitcoin',
        cashCurrency: 'USD',
        otherLabel: '',
        otherDetails: '',
        contactEmail: 'contact@trackflow.com',
        contactMessage: '',
        bankInfoPartial: '',
        accountNumberPartial: '',
        referenceCode: '',
      }
    }))
  }

  const handleSenderCompanyChange = (e) => {
    const company = e.target.value
    const companyInfo = COMPANY_DATA[company] || {}
    
    setFormData(prev => ({
      ...prev,
      senderCompany: company,
      ...companyInfo
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const updateData = {
        ...formData,
        updatedAt: new Date().toISOString(),
        weight: formData.weight ? parseFloat(formData.weight) : null,
        declaredValue: formData.declaredValue ? parseFloat(formData.declaredValue) : null,
        currentLatitude: formData.currentLatitude ? parseFloat(formData.currentLatitude) : null,
        currentLongitude: formData.currentLongitude ? parseFloat(formData.currentLongitude) : null,
        animalWeight: formData.animalWeight ? parseFloat(formData.animalWeight) : null,
        animalQuantity: formData.animalQuantity ? parseInt(formData.animalQuantity) : null,
      }

      await updateShipment(id, updateData)

      alert('✅ Shipment updated successfully!')
      navigate('/admin/shipments')
    } catch (error) {
      console.error('Error updating shipment:', error)
      alert(`❌ Error updating shipment: ${error.message || 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Rendu des champs de paiement dynamiques
  const renderPaymentFields = () => {
    switch (formData.paymentMethod) {
      case 'bank-transfer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="col-span-2">
              <p className="text-xs text-blue-600 font-semibold mb-2">🏦 Bank Transfer Details</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
              <input
                type="text"
                name="bankName"
                value={formData.paymentDetails.bankName}
                onChange={handlePaymentDetailChange}
                placeholder="e.g., Barclays Bank"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder *</label>
              <input
                type="text"
                name="accountHolder"
                value={formData.paymentDetails.accountHolder}
                onChange={handlePaymentDetailChange}
                placeholder="e.g., Track Flow Ltd"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IBAN *</label>
              <input
                type="text"
                name="iban"
                value={formData.paymentDetails.iban}
                onChange={handlePaymentDetailChange}
                placeholder="e.g., GB29NWBK60161331926819"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">BIC / SWIFT</label>
              <input
                type="text"
                name="bic"
                value={formData.paymentDetails.bic}
                onChange={handlePaymentDetailChange}
                placeholder="e.g., NWBKGB2L"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
          </div>
        )

      case 'paypal':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-2">💰 PayPal Details</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Email *</label>
              <input
                type="email"
                name="paypalEmail"
                value={formData.paymentDetails.paypalEmail}
                onChange={handlePaymentDetailChange}
                placeholder="e.g., payments@trackflow.com"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
          </div>
        )

      case 'crypto':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-2">₿ Crypto Details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cryptocurrency *</label>
                <select
                  name="cryptoType"
                  value={formData.paymentDetails.cryptoType}
                  onChange={handlePaymentDetailChange}
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                >
                  {cryptoTypes.map(crypto => (
                    <option key={crypto.value} value={crypto.value}>
                      {crypto.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address *</label>
                <input
                  type="text"
                  name="cryptoWallet"
                  value={formData.paymentDetails.cryptoWallet}
                  onChange={handlePaymentDetailChange}
                  placeholder="e.g., 0x1234567890abcdef..."
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>
            </div>
          </div>
        )

      case 'cash':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-2">💵 Cash Details</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
              <select
                name="cashCurrency"
                value={formData.paymentDetails.cashCurrency}
                onChange={handlePaymentDetailChange}
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              >
                <option value="USD">💵 USD</option>
                <option value="EUR">💶 EUR</option>
                <option value="GBP">💷 GBP</option>
                <option value="CAD">🇨🇦 CAD</option>
                <option value="AUD">🇦🇺 AUD</option>
                <option value="JPY">🇯🇵 JPY</option>
                <option value="CHF">🇨🇭 CHF</option>
                <option value="CNY">🇨🇳 CNY</option>
                <option value="XOF">🇫🇷 CFA</option>
                <option value="NGN">🇳🇬 NGN</option>
              </select>
            </div>
          </div>
        )

      case 'other':
        return (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-600 font-semibold mb-2">🔗 Custom Payment Method</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method Name *</label>
                <input
                  type="text"
                  name="otherLabel"
                  value={formData.paymentDetails.otherLabel}
                  onChange={handlePaymentDetailChange}
                  placeholder="e.g., Western Union, MoneyGram, etc."
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Details *</label>
                <textarea
                  name="otherDetails"
                  value={formData.paymentDetails.otherDetails}
                  onChange={handlePaymentDetailChange}
                  rows="3"
                  placeholder="Enter all necessary payment details..."
                  className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                />
              </div>
            </div>
          </div>
        )

      // ✅ Contact by Email - Version client
      case 'contact-email':
        return (
          <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
            <div className="flex items-center gap-2 text-purple-700 font-semibold mb-3">
              <Mail className="w-5 h-5" />
              Contact us by Email - Payment Information
            </div>
            
            <div className="bg-purple-100/50 p-3 rounded-lg border border-purple-200 mb-4">
              <p className="text-sm text-purple-700 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Your partial bank details will be displayed to the customer. 
                They can then <strong>contact us by email</strong> to complete the payment securely.</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name (Visible to customer) *
                </label>
                <input
                  type="text"
                  name="bankInfoPartial"
                  value={formData.paymentDetails.bankInfoPartial}
                  onChange={handlePaymentDetailChange}
                  placeholder="e.g., Barclays Bank"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">This will be visible to the customer</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number (Partial - Visible) *
                </label>
                <input
                  type="text"
                  name="accountNumberPartial"
                  value={formData.paymentDetails.accountNumberPartial}
                  onChange={handlePaymentDetailChange}
                  placeholder="e.g., ****3192"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">Only last 4 digits for security</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Code / Order ID (Visible) *
                </label>
                <input
                  type="text"
                  name="referenceCode"
                  value={formData.paymentDetails.referenceCode}
                  onChange={handlePaymentDetailChange}
                  placeholder="e.g., TRK-2024-001, PO-12345"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">This reference will help identify the payment</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.paymentDetails.contactEmail}
                  onChange={handlePaymentDetailChange}
                  placeholder="contact@trackflow.com"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">Email address where customers should send payment confirmation</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions for Customer (Optional)
                </label>
                <textarea
                  name="contactMessage"
                  value={formData.paymentDetails.contactMessage}
                  onChange={handlePaymentDetailChange}
                  rows="2"
                  placeholder="e.g., Please send us an email with your payment confirmation..."
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">These instructions will be shown to the customer</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-100/50 rounded-lg border border-green-200">
              <div className="flex items-start gap-2 text-sm text-green-700">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Customers will see: <strong>"{formData.paymentDetails.bankInfoPartial || 'Bank Name'}"</strong> - 
                Account: <strong>{formData.paymentDetails.accountNumberPartial || '****0000'}</strong> - 
                Reference: <strong>{formData.paymentDetails.referenceCode || 'Order #'}</strong></span>
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

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/shipments" className="text-orange-600 hover:text-orange-800">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Update Shipment</h1>
        <span className="ml-auto text-sm text-gray-500">
          <span className="font-mono font-bold text-orange-600">{shipment.trackingCode}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            {/* Status Section */}
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
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
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
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
                    className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
                  />
                </div>
              </div>
            </div>

            {/* 🐾 Animal Transport */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🐾</span> Animal Transport
              </h3>
              
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="isAnimalTransport"
                    checked={formData.isAnimalTransport}
                    onChange={handleChange}
                    className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                  />
                  This shipment contains animals
                </label>
              </div>

              {formData.isAnimalTransport && (
                <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Animal Name *
                      </label>
                      <input
                        type="text"
                        name="animalName"
                        value={formData.animalName}
                        onChange={handleChange}
                        placeholder="e.g., Max, Bella, Charlie"
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Animal Type *
                      </label>
                      <select
                        name="animalType"
                        value={formData.animalType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      >
                        <option value="">Select type...</option>
                        <option value="dog">🐕 Dog</option>
                        <option value="cat">🐈 Cat</option>
                        <option value="bird">🐦 Bird</option>
                        <option value="fish">🐠 Fish</option>
                        <option value="reptile">🦎 Reptile</option>
                        <option value="horse">🐴 Horse</option>
                        <option value="livestock">🐄 Livestock</option>
                        <option value="exotic">🦁 Exotic</option>
                        <option value="other">🐾 Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Breed <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="animalBreed"
                        value={formData.animalBreed}
                        onChange={handleChange}
                        placeholder="e.g., Labrador, Persian..."
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        name="animalQuantity"
                        value={formData.animalQuantity}
                        onChange={handleChange}
                        min="1"
                        placeholder="1"
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg) <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="number"
                        name="animalWeight"
                        value={formData.animalWeight}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="e.g., 5.5"
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Age <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="animalAge"
                        value={formData.animalAge}
                        onChange={handleChange}
                        placeholder="e.g., 2 years"
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cage/Container Type <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <select
                        name="animalCageType"
                        value={formData.animalCageType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      >
                        <option value="">Select cage type...</option>
                        <option value="crate">📦 Crate</option>
                        <option value="carrier">🎒 Carrier</option>
                        <option value="tank">🫙 Tank/Aquarium</option>
                        <option value="trailer">🚛 Trailer</option>
                        <option value="special">🔧 Custom/Special</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Health Certificate <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="animalHealthCertificate"
                        value={formData.animalHealthCertificate}
                        onChange={handleChange}
                        placeholder="Certificate number"
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Feeding Instructions <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="animalFeedingInstructions"
                        value={formData.animalFeedingInstructions}
                        onChange={handleChange}
                        placeholder="e.g., Feed every 4 hours"
                        className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 mt-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        name="animalVaccination"
                        checked={formData.animalVaccination}
                        onChange={handleChange}
                        className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                      />
                      💉 Vaccinations up to date
                    </label>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Needs / Instructions <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <textarea
                      name="animalSpecialNeeds"
                      value={formData.animalSpecialNeeds}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g., Requires medication, special temperature..."
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 📦 Product Info - INTELLIGENT */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📦</span> Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Name {isAnimal ? <span className="text-green-600 text-xs">(Auto-filled from animal name)</span> : '*'}
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required={!isAnimal}
                    readOnly={isAnimal}
                    placeholder={isAnimal ? 'Auto-filled from animal name' : 'e.g., iPhone 15 Pro, Labrador Puppy'}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none ${
                      isAnimal ? 'bg-gray-100 cursor-not-allowed border-green-300' : 'border-gray-200'
                    }`}
                  />
                  {isAnimal && (
                    <p className="text-xs text-green-600 mt-1">✅ Auto-filled from animal name</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Description {isAnimal && <span className="text-gray-400 text-xs">(Optional)</span>}
                  </label>
                  <input
                    type="text"
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder={isAnimal ? "e.g., Golden Retriever puppy" : "Brief description of the product"}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 📍 Location & Delivery */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📍</span> Location & Delivery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Location *
                  </label>
                  <input
                    type="text"
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., Los Angeles, CA"
                  />
                </div>
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
                    Departure Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="departureDateTime"
                    value={formData.departureDateTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude (GPS)
                  </label>
                  <input
                    type="number"
                    name="currentLatitude"
                    value={formData.currentLatitude}
                    onChange={handleChange}
                    step="any"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., 34.0522"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude (GPS)
                  </label>
                  <input
                    type="number"
                    name="currentLongitude"
                    value={formData.currentLongitude}
                    onChange={handleChange}
                    step="any"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., -118.2437"
                  />
                </div>
              </div>
            </div>

            {/* 📤 Sender - Premium Companies */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📤</span> Sender (Premium Logistics Partner)
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Logistics Partner * <span className="text-xs text-gray-400">(Select a premium carrier)</span>
                </label>
                <select
                  name="senderCompany"
                  value={formData.senderCompany}
                  onChange={handleSenderCompanyChange}
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-orange-50/50 font-medium"
                >
                  {senderCompanies.map(company => (
                    <option key={company.value} value={company.value} className="py-2">
                      {company.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 mb-2">📋 Auto-filled from selected partner</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="senderName"
                    value={formData.senderName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                  <input
                    type="text"
                    name="senderTaxId"
                    value={formData.senderTaxId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="senderEmail"
                    value={formData.senderEmail}
                    onChange={handleChange}
                    placeholder="sender@company.com"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="senderPhone"
                    value={formData.senderPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="senderAddress"
                    value={formData.senderAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 📬 Recipient */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📬</span> Recipient
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={formData.recipientEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="recipientPhone"
                    value={formData.recipientPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    name="recipientAddress"
                    value={formData.recipientAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="456 Oak Ave, New York, NY 10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    type="text"
                    name="recipientCity"
                    value={formData.recipientCity}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="recipientPostalCode"
                    value={formData.recipientPostalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="10001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    name="recipientCountry"
                    value={formData.recipientCountry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Australia">Australia</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 📦 Package Details */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📦</span> Package Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="2.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions (L x W x H cm)</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="30 x 20 x 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Declared Value (USD)</label>
                  <input
                    type="number"
                    name="declaredValue"
                    value={formData.declaredValue}
                    onChange={handleChange}
                    step="0.01"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="500.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package Type</label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    <option value="standard">📦 Standard</option>
                    <option value="fragile">⚠️ Fragile</option>
                    <option value="urgent">🚀 Urgent</option>
                    <option value="perishable">🧊 Perishable</option>
                    <option value="oversized">📏 Oversized</option>
                    <option value="hazardous">☣️ Hazardous</option>
                    <option value="valuable">💎 Valuable</option>
                    <option value="medical">🏥 Medical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Type</label>
                  <select
                    name="deliveryType"
                    value={formData.deliveryType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    <option value="standard">🐢 Standard (3-5 days)</option>
                    <option value="express">🚗 Express (1-2 days)</option>
                    <option value="same-day">⚡ Same Day</option>
                    <option value="next-day">📅 Next Day</option>
                    <option value="scheduled">📋 Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance</label>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Handling Instructions</label>
                  <select
                    name="handlingInstructions"
                    value={formData.handlingInstructions}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                  >
                    <option value="">Select handling...</option>
                    <option value="forklift">Forklift required</option>
                    <option value="stackable">Stackable</option>
                    <option value="non-stackable">Non-stackable</option>
                    <option value="temperature-controlled">Temperature controlled</option>
                    <option value="hazardous">Hazardous handling</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                  <input
                    type="text"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., 2-8°C, -20°C, Ambient"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-4">
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

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                  placeholder="Any special delivery instructions..."
                />
              </div>
            </div>

            {/* 🚚 Courier */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🚚</span> Assigned Courier
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., Martin Marin"
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
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="martin.marin@trackflow.com"
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

            {/* 💳 Payment Methods */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">💳</span> Payment Methods
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Payment Method *
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-orange-50/50 font-medium"
                  >
                    {paymentMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Status *
                  </label>
                  <select
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-blue-50/50 font-medium"
                  >
                    {paymentStatusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {renderPaymentFields()}
            </div>

            {/* 📋 Additional Info */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-orange-500">📋</span> Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference Number
                  </label>
                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., PO-2024-1234"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Center
                  </label>
                  <input
                    type="text"
                    name="costCenter"
                    value={formData.costCenter}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="e.g., CC-05-2024"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Internal Notes (Admin only)
                </label>
                <textarea
                  name="internalNotes"
                  value={formData.internalNotes}
                  onChange={handleChange}
                  rows="2"
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none resize-none"
                  placeholder="Private notes for internal use..."
                />
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
                <span className="text-gray-500">Tracking Code</span>
                <span className="font-mono font-bold text-orange-600">{shipment.trackingCode}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Status</span>
                <span className="font-medium capitalize">{shipment.status || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Priority</span>
                <span className="font-medium capitalize">{shipment.priority || 'Normal'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Payment Status</span>
                <span className={`font-medium capitalize px-2 py-0.5 rounded ${
                  shipment.paymentStatus === 'confirmed' ? 'bg-green-100 text-green-700' :
                  shipment.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  shipment.paymentStatus === 'failed' ? 'bg-red-100 text-red-700' :
                  shipment.paymentStatus === 'refunded' ? 'bg-gray-100 text-gray-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {shipment.paymentStatus || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Product</span>
                <span className="font-medium">{shipment.productName || 'N/A'}</span>
              </div>
              {shipment.isAnimalTransport && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">Animal</span>
                  <span className="font-medium">{shipment.animalName || 'N/A'} ({shipment.animalType || 'N/A'})</span>
                </div>
              )}
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
                <span className="text-gray-500">Departure</span>
                <span className="font-medium">
                  {shipment.departureDateTime 
                    ? new Date(shipment.departureDateTime).toLocaleDateString()
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
              <li>• Update payment status when confirmed</li>
              <li>• Add animal details if transporting animals</li>
              <li>• Use "Contact us by Email" for manual payment confirmation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateShipment