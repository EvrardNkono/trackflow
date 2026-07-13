// src/components/TrackingReceipt.jsx
import React, { useRef } from 'react'
import { Download, Printer, FileText } from 'lucide-react'
import logo from '/images/logo.png'

const TrackingReceipt = ({ shipment, onClose }) => {
  const receiptRef = useRef(null)

  if (!shipment) return null

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDateShort = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handlePrint = () => {
    const printContent = receiptRef.current
    if (!printContent) return

    const originalTitle = document.title
    document.title = `Tracking Receipt - ${shipment.trackingCode}`

    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) {
      alert('Please allow popups for printing')
      return
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Tracking Receipt - ${shipment.trackingCode}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
            .receipt-container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 3px solid #ea580c; padding-bottom: 20px; margin-bottom: 20px; }
            .header-logo { max-height: 80px; width: auto; margin-bottom: 10px; }
            .header h1 { color: #ea580c; margin: 0; font-size: 24px; }
            .header p { color: #666; margin: 5px 0 0 0; }
            .tracking-code { background: #fff7ed; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; border: 2px solid #ea580c; }
            .tracking-code h2 { color: #ea580c; margin: 0; font-family: monospace; font-size: 24px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #1a202c; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px; }
            .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
            .row-label { color: #6b7280; font-weight: 500; }
            .row-value { color: #1a202c; font-weight: 600; }
            .status-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-in-transit { background: #ede9fe; color: #5b21b6; }
            .status-delivered { background: #d1fae5; color: #065f46; }
            .status-delayed { background: #fee2e2; color: #991b1b; }
            .status-customs-clearance { background: #f3e8ff; color: #6b21a5; }
            .status-address-issue { background: #ffedd5; color: #9a3412; }
            .status-security-check { background: #f1f5f9; color: #475569; }
            .status-cancelled { background: #fee2e2; color: #991b1b; }
            .priority-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; margin-left: 6px; }
            .priority-low { background: #f3f4f6; color: #4b5563; }
            .priority-normal { background: #dbeafe; color: #1e40af; }
            .priority-high { background: #fed7aa; color: #9a3412; }
            .priority-urgent { background: #fecaca; color: #991b1b; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .watermark { color: #f3f4f6; font-size: 120px; position: absolute; right: 20px; bottom: 20px; opacity: 0.1; font-weight: bold; }
            .flag-icon { margin-right: 4px; }
            .payment-details { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin-top: 8px; }
            .payment-details .row { border-bottom-color: #dcfce7; }
            .payment-details .row:last-child { border-bottom: none; }
            @media print {
              body { background: white; }
              .receipt-container { box-shadow: none; padding: 20px; }
              .no-print { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div class="receipt-container" style="position: relative;">
            ${printContent.innerHTML}
            <div class="watermark">TRACK FLOW</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          <\/script>
        </body>
      </html>
    `)

    printWindow.document.close()

    setTimeout(() => {
      document.title = originalTitle
    }, 1000)
  }

  const handleDownloadPDF = () => {
    const printContent = receiptRef.current
    if (!printContent) return

    const originalTitle = document.title
    document.title = `Tracking Receipt - ${shipment.trackingCode}`

    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) {
      alert('Please allow popups for download')
      return
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Tracking Receipt - ${shipment.trackingCode}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
            .receipt-container { max-width: 800px; margin: 0 auto; padding: 40px; position: relative; }
            .header { text-align: center; border-bottom: 3px solid #ea580c; padding-bottom: 20px; margin-bottom: 20px; }
            .header-logo { max-height: 80px; width: auto; margin-bottom: 10px; }
            .header h1 { color: #ea580c; margin: 0; font-size: 24px; }
            .header p { color: #666; margin: 5px 0 0 0; }
            .tracking-code { background: #fff7ed; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px; border: 2px solid #ea580c; }
            .tracking-code h2 { color: #ea580c; margin: 0; font-family: monospace; font-size: 24px; }
            .section { margin-bottom: 20px; }
            .section-title { font-weight: bold; color: #1a202c; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px; }
            .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f3f4f6; }
            .row-label { color: #6b7280; font-weight: 500; }
            .row-value { color: #1a202c; font-weight: 600; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af; }
            .status-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
            .status-pending { background: #fef3c7; color: #92400e; }
            .status-in-transit { background: #ede9fe; color: #5b21b6; }
            .status-delivered { background: #d1fae5; color: #065f46; }
            .status-delayed { background: #fee2e2; color: #991b1b; }
            .priority-badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; margin-left: 6px; }
            .priority-low { background: #f3f4f6; color: #4b5563; }
            .priority-normal { background: #dbeafe; color: #1e40af; }
            .priority-high { background: #fed7aa; color: #9a3412; }
            .priority-urgent { background: #fecaca; color: #991b1b; }
            .watermark { color: #f3f4f6; font-size: 120px; position: absolute; right: 20px; bottom: 20px; opacity: 0.1; font-weight: bold; }
            .payment-details { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px; margin-top: 8px; }
            .payment-details .row { border-bottom-color: #dcfce7; }
            .payment-details .row:last-child { border-bottom: none; }
          </style>
        </head>
        <body>
          <div class="receipt-container">
            ${printContent.innerHTML}
            <div class="watermark">TRACK FLOW</div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          <\/script>
        </body>
      </html>
    `)

    printWindow.document.close()

    setTimeout(() => {
      document.title = originalTitle
    }, 1000)
  }

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'status-pending',
      processing: 'status-pending',
      'in-transit': 'status-in-transit',
      'out-for-delivery': 'status-in-transit',
      delivered: 'status-delivered',
      delayed: 'status-delayed',
      'customs-clearance': 'status-customs-clearance',
      'held-by-customs': 'status-customs-clearance',
      'customs-inspection': 'status-customs-clearance',
      'additional-docs-required': 'status-customs-clearance',
      'cleared-customs': 'status-customs-clearance',
      'address-issue': 'status-address-issue',
      'incomplete-address': 'status-address-issue',
      'incorrect-address': 'status-address-issue',
      'security-check': 'status-security-check',
      'random-inspection': 'status-security-check',
      damaged: 'status-delayed',
      lost: 'status-delayed',
      returned: 'status-delayed',
      cancelled: 'status-cancelled',
    }
    return classes[status] || 'status-pending'
  }

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

  const getPriorityClass = (priority) => {
    const classes = {
      low: 'priority-low',
      normal: 'priority-normal',
      high: 'priority-high',
      urgent: 'priority-urgent',
    }
    return classes[priority] || 'priority-normal'
  }

  // Rendu des détails de paiement
  const renderPaymentDetails = () => {
    const { paymentMethod, paymentDetails } = shipment
    if (!paymentMethod) return null

    switch (paymentMethod) {
      case 'bank-transfer':
        return (
          <div className="payment-details">
            <p className="font-semibold text-sm text-green-700 mb-2">🏦 Bank Transfer</p>
            <div className="row">
              <span className="row-label">Bank Name</span>
              <span className="row-value">{paymentDetails?.bankName || 'N/A'}</span>
            </div>
            <div className="row">
              <span className="row-label">Account Holder</span>
              <span className="row-value">{paymentDetails?.accountHolder || 'N/A'}</span>
            </div>
            <div className="row">
              <span className="row-label">IBAN</span>
              <span className="row-value font-mono text-xs">{paymentDetails?.iban || 'N/A'}</span>
            </div>
            {paymentDetails?.bic && (
              <div className="row">
                <span className="row-label">BIC / SWIFT</span>
                <span className="row-value font-mono text-xs">{paymentDetails.bic}</span>
              </div>
            )}
          </div>
        )

      case 'paypal':
        return (
          <div className="payment-details">
            <p className="font-semibold text-sm text-green-700 mb-2">💰 PayPal</p>
            <div className="row">
              <span className="row-label">PayPal Email</span>
              <span className="row-value">{paymentDetails?.paypalEmail || 'N/A'}</span>
            </div>
          </div>
        )

      case 'crypto':
        return (
          <div className="payment-details">
            <p className="font-semibold text-sm text-green-700 mb-2">₿ Crypto</p>
            <div className="row">
              <span className="row-label">Cryptocurrency</span>
              <span className="row-value capitalize">{paymentDetails?.cryptoType || 'N/A'}</span>
            </div>
            <div className="row">
              <span className="row-label">Wallet Address</span>
              <span className="row-value font-mono text-xs break-all">{paymentDetails?.cryptoWallet || 'N/A'}</span>
            </div>
          </div>
        )

      case 'cash':
        return (
          <div className="payment-details">
            <p className="font-semibold text-sm text-green-700 mb-2">💵 Cash</p>
            <div className="row">
              <span className="row-label">Currency</span>
              <span className="row-value">{paymentDetails?.cashCurrency || 'USD'}</span>
            </div>
          </div>
        )

      case 'other':
        return (
          <div className="payment-details">
            <p className="font-semibold text-sm text-green-700 mb-2">🔗 Custom Payment</p>
            <div className="row">
              <span className="row-label">Method</span>
              <span className="row-value">{paymentDetails?.otherLabel || 'N/A'}</span>
            </div>
            <div className="row">
              <span className="row-label">Details</span>
              <span className="row-value text-sm whitespace-pre-wrap">{paymentDetails?.otherDetails || 'N/A'}</span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Noms des méthodes de paiement
  const paymentMethodLabels = {
    'bank-transfer': '🏦 Bank Transfer',
    'paypal': '💰 PayPal',
    'crypto': '₿ Crypto',
    'cash': '💵 Cash',
    'other': '🔗 Other'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with actions */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-500" />
            Tracking Receipt
          </h2>
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div ref={receiptRef} className="p-6 md:p-8">
          {/* Header avec logo */}
          <div className="text-center border-b-3 border-orange-500 pb-6 mb-6">
            <img 
              src={logo} 
              alt="Track Flow" 
              className="h-20 md:h-24 w-auto object-contain mx-auto mb-3"
            />
            <h1 className="text-2xl font-bold text-orange-600">Track Flow</h1>
            <p className="text-gray-500">Fast, Safe &amp; Affordable</p>
            <p className="text-xs text-gray-400 mt-1">www.trackflow.agency</p>
          </div>

          {/* Tracking Code & Status */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 text-center mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">Tracking Code</p>
                <h2 className="text-2xl font-mono font-bold text-orange-600">{shipment.trackingCode}</h2>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className={`status-badge ${getStatusBadgeClass(shipment.status)}`}>
                  {getStatusLabel(shipment.status)}
                </span>
                <span className={`priority-badge ${getPriorityClass(shipment.priority)} flex items-center gap-1`}>
                  {shipment.priority === 'urgent' ? '🔴' : 
                   shipment.priority === 'high' ? '🟠' : 
                   shipment.priority === 'low' ? '⚪' : '🔵'} {shipment.priority || 'Normal'}
                </span>
              </div>
            </div>
            {/* ✅ Description du statut */}
            {shipment.statusDescription && (
              <div className="mt-3 p-3 bg-white/80 rounded-lg border border-orange-200 text-left">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Status Details:</span> {shipment.statusDescription}
                </p>
              </div>
            )}
          </div>

          {/* Grid 2 colonnes - Infos principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shipment Info */}
            <div className="section">
              <h3 className="section-title">📦 Shipment Details</h3>
              <div className="row">
                <span className="row-label">Weight</span>
                <span className="row-value">{shipment.weight || 'N/A'} kg</span>
              </div>
              <div className="row">
                <span className="row-label">Dimensions</span>
                <span className="row-value">{shipment.dimensions || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Package Type</span>
                <span className="row-value capitalize">{shipment.packageType || 'Standard'}</span>
              </div>
              <div className="row">
                <span className="row-label">Delivery Type</span>
                <span className="row-value capitalize">{shipment.deliveryType || 'Standard'}</span>
              </div>
              <div className="row">
                <span className="row-label">Insurance</span>
                <span className="row-value capitalize">{shipment.insuranceType || 'None'}</span>
              </div>
              <div className="row">
                <span className="row-label">Declared Value</span>
                <span className="row-value">${shipment.declaredValue || '0.00'}</span>
              </div>
              <div className="row">
                <span className="row-label">Temperature</span>
                <span className="row-value">{shipment.temperature || 'Ambient'}</span>
              </div>
              <div className="row">
                <span className="row-label">Handling</span>
                <span className="row-value capitalize">{shipment.handlingInstructions || 'Standard'}</span>
              </div>
              {shipment.referenceNumber && (
                <div className="row">
                  <span className="row-label">Reference #</span>
                  <span className="row-value">{shipment.referenceNumber}</span>
                </div>
              )}
              {shipment.costCenter && (
                <div className="row">
                  <span className="row-label">Cost Center</span>
                  <span className="row-value">{shipment.costCenter}</span>
                </div>
              )}
            </div>

            {/* Delivery Info */}
            <div className="section">
              <h3 className="section-title">🚚 Delivery Info</h3>
              <div className="row">
                <span className="row-label">Estimated Delivery</span>
                <span className="row-value">{shipment.estimatedDelivery ? formatDate(shipment.estimatedDelivery) : 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Current Location</span>
                <span className="row-value">{shipment.currentLocation || 'N/A'}</span>
              </div>
              {shipment.courierName && (
                <div className="row">
                  <span className="row-label">Courier</span>
                  <span className="row-value">{shipment.courierName}</span>
                </div>
              )}
              {shipment.courierEmail && (
                <div className="row">
                  <span className="row-label">Courier Email</span>
                  <span className="row-value">{shipment.courierEmail}</span>
                </div>
              )}
              {shipment.vehicleType && (
                <div className="row">
                  <span className="row-label">Vehicle</span>
                  <span className="row-value capitalize">{shipment.vehicleType}</span>
                </div>
              )}
              {shipment.currentLatitude && shipment.currentLongitude && (
                <div className="row">
                  <span className="row-label">GPS Coordinates</span>
                  <span className="row-value text-xs">{shipment.currentLatitude}, {shipment.currentLongitude}</span>
                </div>
              )}
              {/* ✅ Date de création */}
              <div className="row">
                <span className="row-label">Created</span>
                <span className="row-value">{shipment.createdAt ? formatDate(shipment.createdAt) : 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* 💳 Paiement */}
          {shipment.paymentMethod && (
            <div className="section mt-4">
              <h3 className="section-title">💳 Payment Information</h3>
              <div className="row">
                <span className="row-label">Payment Method</span>
                <span className="row-value">{paymentMethodLabels[shipment.paymentMethod] || shipment.paymentMethod}</span>
              </div>
              {renderPaymentDetails()}
            </div>
          )}

          {/* Sender & Recipient */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="section">
              <h3 className="section-title">📤 Sender</h3>
              <div className="row">
                <span className="row-label">Company</span>
                <span className="row-value font-semibold">{shipment.senderCompany || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Tax ID</span>
                <span className="row-value font-mono text-xs">{shipment.senderTaxId || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Name</span>
                <span className="row-value">{shipment.senderName || 'N/A'}</span>
              </div>
              {/* ❌ Email et Phone supprimés - ne pas afficher */}
              <div className="row">
                <span className="row-label">Address</span>
                <span className="row-value">{shipment.senderAddress || 'N/A'}</span>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">📬 Recipient</h3>
              <div className="row">
                <span className="row-label">Name</span>
                <span className="row-value">{shipment.recipientName || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Email</span>
                <span className="row-value">{shipment.recipientEmail || 'N/A'}</span>
              </div>
              {/* ✅ Téléphone du destinataire */}
              <div className="row">
                <span className="row-label">Phone</span>
                <span className="row-value">{shipment.recipientPhone || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">City</span>
                <span className="row-value">{shipment.recipientCity || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Postal Code</span>
                <span className="row-value">{shipment.recipientPostalCode || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Country</span>
                <span className="row-value">{shipment.recipientCountry || 'N/A'}</span>
              </div>
              <div className="row">
                <span className="row-label">Address</span>
                <span className="row-value">{shipment.recipientAddress || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Special Flags */}
          {(shipment.isFragile || shipment.isHazardous || shipment.isPerishable || shipment.specialInstructions) && (
            <div className="section mt-4">
              <h3 className="section-title">⚠️ Special Instructions</h3>
              <div className="flex flex-wrap gap-2 mt-2">
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
                {shipment.handlingInstructions && shipment.handlingInstructions !== 'Select handling...' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">🔧 {shipment.handlingInstructions}</span>
                )}
              </div>
            </div>
          )}

          {/* Status History */}
          {shipment.statusHistory && shipment.statusHistory.length > 0 && (
            <div className="section mt-4">
              <h3 className="section-title">📋 Tracking History</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {shipment.statusHistory.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3 py-2 border-b border-gray-100">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-orange-500 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{getStatusLabel(entry.status)}</span>
                        <span className="text-xs text-gray-400">{formatDateShort(entry.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                      {entry.statusDetails && (
                        <p className="text-xs text-orange-600 mt-1">📌 {entry.statusDetails}</p>
                      )}
                      <p className="text-xs text-gray-400">{entry.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QR Code */}
          <div className="flex justify-center mt-6">
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400 text-center leading-tight">
                  QR Code<br />Track Flow
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="footer mt-6 pt-4 border-t-2 border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Generated on {new Date().toLocaleString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              This is a system-generated receipt. Please verify all information.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              © {new Date().getFullYear()} Track Flow. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackingReceipt