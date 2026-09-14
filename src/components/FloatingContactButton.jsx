// src/components/FloatingContactButton.jsx
import React from 'react'
import { Mail } from 'lucide-react'

const COMPANY_EMAIL = 'cargotrackflow@cargotrackflow.com'

const FloatingContactButton = () => {
  const mailtoLink = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent('Contact from TrackFlow website')}`

  return (
    <a
      href={mailtoLink}
      className="fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg px-5 py-3 flex items-center gap-2 font-medium transition-colors hover:scale-105 transform duration-200"
      title={`Email us at ${COMPANY_EMAIL}`}
    >
      <Mail className="w-5 h-5" />
      <span className="hidden sm:inline">Contact</span>
    </a>
  )
}

export default FloatingContactButton
