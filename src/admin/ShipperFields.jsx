// src/admin/ShipperFields.jsx
// Bloc « Shipper » partagé entre CreateShipment et UpdateShipment.
// L'expéditeur peut être une personne physique OU une entreprise.
import React from 'react'
import { User, Building2 } from 'lucide-react'
import { COUNTRIES, getCountryOptions } from '../utils/countries'
import { SHIPPER_TYPES } from '../utils/shipper'

const inputClass =
  'w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white'

const Field = ({ label, required, optional, hint, className = '', children }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {optional && <span className="text-gray-400 text-xs"> (Optional)</span>}
    </label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
)

const ShipperFields = ({ formData, onChange }) => {
  const isCompany = formData.shipperType === SHIPPER_TYPES.company

  const setType = (value) => {
    onChange({ target: { name: 'shipperType', value, type: 'text' } })
  }

  const typeButton = (value, Icon, title, subtitle) => {
    const active = formData.shipperType === value
    return (
      <button
        type="button"
        onClick={() => setType(value)}
        aria-pressed={active}
        className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border-2 transition-all ${
          active
            ? 'border-orange-500 bg-orange-50 shadow-sm'
            : 'border-gray-200 bg-white hover:border-orange-300'
        }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            active ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <Icon className="w-5 h-5" />
        </span>
        <span>
          <span className={`block font-semibold ${active ? 'text-orange-700' : 'text-gray-700'}`}>{title}</span>
          <span className="block text-xs text-gray-500">{subtitle}</span>
        </span>
      </button>
    )
  }

  return (
    <div className="border-t pt-6">
      <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
        <span className="text-orange-500">🧑‍💼</span> Shipper (Who is sending the package)
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        The person or company that hands the package over to the delivery company.
      </p>

      {/* Choix du type d'expéditeur */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {typeButton(SHIPPER_TYPES.individual, User, 'Individual', 'A private person')}
        {typeButton(SHIPPER_TYPES.company, Building2, 'Company', 'A business or organisation')}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        {isCompany ? (
          <>
            <Field label="Company Name">
              <input
                type="text"
                name="shipperCompanyName"
                value={formData.shipperCompanyName}
                onChange={onChange}
                placeholder="e.g., Dupont Import Export SARL"
                className={inputClass}
              />
            </Field>
            <Field label="Contact Person" optional>
              <input
                type="text"
                name="shipperContactName"
                value={formData.shipperContactName}
                onChange={onChange}
                placeholder="e.g., Marie Dupont"
                className={inputClass}
              />
            </Field>
            <Field label="Tax ID / VAT Number" optional className="md:col-span-2">
              <input
                type="text"
                name="shipperTaxId"
                value={formData.shipperTaxId}
                onChange={onChange}
                placeholder="e.g., FR12345678901"
                className={inputClass}
              />
            </Field>
          </>
        ) : (
          <>
            <Field label="First Name">
              <input
                type="text"
                name="shipperFirstName"
                value={formData.shipperFirstName}
                onChange={onChange}
                placeholder="e.g., Jean"
                className={inputClass}
              />
            </Field>
            <Field label="Last Name">
              <input
                type="text"
                name="shipperLastName"
                value={formData.shipperLastName}
                onChange={onChange}
                placeholder="e.g., Dupont"
                className={inputClass}
              />
            </Field>
          </>
        )}

        <Field label="Email">
          <input
            type="email"
            name="shipperEmail"
            value={formData.shipperEmail}
            onChange={onChange}
            placeholder="shipper@example.com"
            className={inputClass}
          />
        </Field>
        <Field label="Phone" optional>
          <input
            type="tel"
            name="shipperPhone"
            value={formData.shipperPhone}
            onChange={onChange}
            placeholder="+33 6 12 34 56 78"
            className={inputClass}
          />
        </Field>

        <Field label={isCompany ? 'Company Address' : 'Address'} className="md:col-span-2">
          <input
            type="text"
            name="shipperAddress"
            value={formData.shipperAddress}
            onChange={onChange}
            placeholder="e.g., 12 Rue de la Paix"
            className={inputClass}
          />
        </Field>
        <Field label="City">
          <input
            type="text"
            name="shipperCity"
            value={formData.shipperCity}
            onChange={onChange}
            placeholder="e.g., Paris"
            className={inputClass}
          />
        </Field>
        <Field label="Postal Code" optional>
          <input
            type="text"
            name="shipperPostalCode"
            value={formData.shipperPostalCode}
            onChange={onChange}
            placeholder="e.g., 75002"
            className={inputClass}
          />
        </Field>
        <Field label="Country" className="md:col-span-2">
          <select
            name="shipperCountry"
            value={formData.shipperCountry}
            onChange={onChange}
            className={inputClass}
          >
            <option value="">Select country...</option>
            {getCountryOptions(formData.shipperCountry).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">{COUNTRIES.length} countries available</p>
        </Field>
      </div>
    </div>
  )
}

export default ShipperFields
