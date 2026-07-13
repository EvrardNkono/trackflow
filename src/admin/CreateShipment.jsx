// src/admin/CreateShipment.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateSecureTrackingCode } from '../utils/trackingCode'
import useShipments from '../hooks/useShipments'
import { Mail, Info, CheckCircle } from 'lucide-react'

const CreateShipment = () => {
  const navigate = useNavigate()
  const { createShipment } = useShipments()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    // Tracking code
    trackingCode: generateSecureTrackingCode(),
    
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
  })

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

  const handleRegenerateCode = () => {
    setFormData(prev => ({
      ...prev,
      trackingCode: generateSecureTrackingCode()
    }))
  }

  const handleSenderCompanyChange = (e) => {
    const company = e.target.value
    setFormData(prev => ({ ...prev, senderCompany: company }))
    
    const companyData = {
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

    if (companyData[company]) {
      setFormData(prev => ({
        ...prev,
        senderName: companyData[company].senderName,
        senderAddress: companyData[company].senderAddress,
        senderTaxId: companyData[company].senderTaxId,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newShipment = await createShipment({
        ...formData,
        status: 'pending',
        paymentStatus: formData.paymentStatus || 'pending',
        statusHistory: [
          {
            status: 'pending',
            date: new Date().toISOString(),
            location: formData.currentLocation || 'Warehouse',
            latitude: parseFloat(formData.currentLatitude) || 0,
            longitude: parseFloat(formData.currentLongitude) || 0,
            description: 'Shipment created',
          }
        ],
        events: []
      })
      
      if (newShipment) {
        alert(`✅ Shipment ${newShipment.trackingCode} created successfully!`)
        navigate('/admin')
      }
    } catch (error) {
      alert('❌ Error creating shipment')
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
                required
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
                required
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
                required
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
                required
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
                  required
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
                  required
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
                required
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
                  required
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
                  required
                />
              </div>
            </div>
          </div>
        )

      // ✅ Contact by Email - Version client (l'utilisateur contacte l'admin)
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
                  required
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
                  required
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
                  required
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
                  required
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Shipment</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Tracking Code & Priority */}
        <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tracking Code
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  name="trackingCode"
                  value={formData.trackingCode}
                  readOnly
                  className="flex-1 px-4 py-2 bg-white border-2 border-orange-300 rounded-lg font-mono text-lg font-bold text-orange-600 cursor-default"
                />
                <button
                  type="button"
                  onClick={handleRegenerateCode}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  🔄 Regenerate
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">Priority:</span>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="px-3 py-1 border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">🔴 Urgent</option>
              </select>
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
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                placeholder="e.g., Los Angeles, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Delivery *
              </label>
              <input
                type="datetime-local"
                name="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departure Date & Time *
              </label>
              <input
                type="datetime-local"
                name="departureDateTime"
                value={formData.departureDateTime}
                onChange={handleChange}
                required
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
                readOnly
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
              <input
                type="text"
                name="senderTaxId"
                value={formData.senderTaxId}
                readOnly
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="senderAddress"
                value={formData.senderAddress}
                readOnly
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
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
                required
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
                required
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
                required
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
                required
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
                <option value="none">❌ None</option>
                <option value="basic">🛡️ Basic</option>
                <option value="standard">🛡️ Standard</option>
                <option value="premium">🛡️ Premium</option>
                <option value="full">🛡️ Full Coverage</option>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Courier Name *
              </label>
              <input
                type="text"
                name="courierName"
                value={formData.courierName}
                onChange={handleChange}
                required
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
                <option value="">Select vehicle...</option>
                <option value="van">🚐 Delivery Van</option>
                <option value="truck">🚛 Truck</option>
                <option value="motorcycle">🏍️ Motorcycle</option>
                <option value="bicycle">🚲 Bicycle</option>
                <option value="car">🚗 Car</option>
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
                <option value="pending">⏳ Pending</option>
                <option value="confirmed">✅ Confirmed</option>
                <option value="failed">❌ Failed</option>
                <option value="refunded">↩️ Refunded</option>
              </select>
            </div>
          </div>

          {/* Champs dynamiques selon le mode de paiement */}
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
            onClick={() => navigate('/admin')}
            className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating...' : 'Create Shipment'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateShipment