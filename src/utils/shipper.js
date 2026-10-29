// src/utils/shipper.js
// Helpers pour l'expéditeur réel du colis (personne physique OU entreprise).
// Ne pas confondre avec `sender*` qui décrit la compagnie de livraison (DHL, FedEx...).

export const SHIPPER_TYPES = {
  individual: 'individual',
  company: 'company',
}

// Valeurs par défaut des champs expéditeur (à étaler dans le state des formulaires)
export const EMPTY_SHIPPER = {
  shipperType: SHIPPER_TYPES.individual,
  shipperFirstName: '',
  shipperLastName: '',
  shipperCompanyName: '',
  shipperContactName: '',
  shipperTaxId: '',
  shipperEmail: '',
  shipperPhone: '',
  shipperAddress: '',
  shipperCity: '',
  shipperPostalCode: '',
  shipperCountry: '',
}

// Récupère les champs expéditeur d'une expédition existante (avec valeurs par défaut)
export const pickShipperFields = (shipment = {}) => {
  const out = {}
  Object.keys(EMPTY_SHIPPER).forEach((key) => {
    out[key] = shipment[key] ?? EMPTY_SHIPPER[key]
  })
  return out
}

// Prépare les données d'affichage (reçu, pages de détail)
export const getShipperDisplay = (shipment = {}) => {
  const type = shipment.shipperType === SHIPPER_TYPES.company
    ? SHIPPER_TYPES.company
    : SHIPPER_TYPES.individual
  const isCompany = type === SHIPPER_TYPES.company

  const fullName = [shipment.shipperFirstName, shipment.shipperLastName]
    .filter(Boolean)
    .join(' ')
    .trim()

  const displayName = isCompany
    ? (shipment.shipperCompanyName || '').trim()
    : fullName

  const cityLine = [shipment.shipperPostalCode, shipment.shipperCity]
    .filter(Boolean)
    .join(' ')
    .trim()

  const addressLines = [shipment.shipperAddress, cityLine, shipment.shipperCountry]
    .map((l) => (l || '').trim())
    .filter(Boolean)

  const hasData = Boolean(
    displayName || fullName || shipment.shipperEmail || shipment.shipperPhone || addressLines.length
  )

  return {
    type,
    isCompany,
    typeLabel: isCompany ? 'Company' : 'Individual',
    displayName,
    contactName: isCompany ? (shipment.shipperContactName || '').trim() : '',
    taxId: isCompany ? (shipment.shipperTaxId || '').trim() : '',
    email: (shipment.shipperEmail || '').trim(),
    phone: (shipment.shipperPhone || '').trim(),
    addressLines,
    hasData,
  }
}

// Adresse du destinataire en lignes (même logique)
export const getRecipientAddressLines = (shipment = {}) => {
  const cityLine = [shipment.recipientPostalCode, shipment.recipientCity]
    .filter(Boolean)
    .join(' ')
    .trim()
  return [shipment.recipientAddress, cityLine, shipment.recipientCountry]
    .map((l) => (l || '').trim())
    .filter(Boolean)
}
