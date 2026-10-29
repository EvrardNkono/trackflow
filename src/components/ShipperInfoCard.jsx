// src/components/ShipperInfoCard.jsx
// Carte « Shipper » (personne physique ou entreprise qui envoie le colis).
// Utilisée dans ShipmentDetails (admin) et TrackingDetailsPage (public).
import React from 'react'
import { User, Building2, MapPin, Mail, Phone, FileText, UserCheck } from 'lucide-react'
import { getShipperDisplay } from '../utils/shipper'

const ShipperInfoCard = ({ shipment, variant = 'public' }) => {
  const shipper = getShipperDisplay(shipment)
  const isAdmin = variant === 'admin'

  // Anciennes expéditions sans expéditeur : rien sur la page publique,
  // un rappel discret côté admin.
  if (!shipper.hasData && !isAdmin) return null

  const Icon = shipper.isCompany ? Building2 : User

  return (
    <div className={`bg-white rounded-xl ${isAdmin ? 'shadow-md' : 'shadow-lg'} p-6 border-l-4 border-orange-500`}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <Icon className="w-5 h-5 text-orange-500" />
          Shipper
        </h3>
        {shipper.hasData && (
          <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
            {shipper.isCompany ? '🏢' : '👤'} {shipper.typeLabel}
          </span>
        )}
      </div>

      {!shipper.hasData ? (
        <p className="text-sm text-gray-400 italic">
          No shipper information yet. Edit this shipment to add the person or company sending the package.
        </p>
      ) : (
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-base font-bold text-gray-900 break-words">{shipper.displayName || 'N/A'}</p>
            {shipper.contactName && (
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-gray-400" /> Contact: {shipper.contactName}
              </p>
            )}
            {shipper.taxId && (
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gray-400" />
                Tax ID: <span className="font-mono">{shipper.taxId}</span>
              </p>
            )}
          </div>

          {shipper.addressLines.length > 0 && (
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-gray-700 break-words">
                {shipper.addressLines.map((line, i) => (
                  <div
                    key={i}
                    className={i === shipper.addressLines.length - 1 && shipper.addressLines.length > 1 ? 'font-semibold uppercase tracking-wide text-gray-900 text-xs mt-0.5' : ''}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(shipper.email || shipper.phone) && (
            <div className="pt-3 border-t border-dashed border-gray-200 space-y-2">
              {shipper.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 break-all">{shipper.email}</span>
                </div>
              )}
              {shipper.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{shipper.phone}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ShipperInfoCard
