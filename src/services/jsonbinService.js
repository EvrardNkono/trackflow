// src/services/jsonbinService.js
import CONFIG from '../config'

const JSONBIN_URL = `${CONFIG.JSONBIN.BASE_URL}/${CONFIG.JSONBIN.BIN_ID}`
const API_KEY = CONFIG.JSONBIN.API_KEY

export const jsonbinService = {
  // ============================================
  // MÉTHODES DE BASE
  // ============================================

  getAll: async () => {
    try {
      const response = await fetch(`${JSONBIN_URL}/latest`, {
        method: 'GET',
        headers: {
          'X-Access-Key': API_KEY,
          'Content-Type': 'application/json',
        }
      })
      
      if (!response.ok) {
        console.error('Status:', response.status)
        throw new Error('Failed to fetch shipments')
      }
      
      const data = await response.json()
      return data.record?.shipments || []
    } catch (error) {
      console.error('Error fetching shipments:', error)
      return []
    }
  },

  saveAll: async (shipments) => {
    try {
      const response = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'X-Access-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shipments })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error(`Failed to save shipments: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error saving shipments:', error)
      throw error
    }
  },

  // ============================================
  // GESTION DES COLIS
  // ============================================

  create: async (shipmentData) => {
    try {
      const shipments = await jsonbinService.getAll()
      
      const newShipment = {
        ...shipmentData,
        id: `ship_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending',
        currentLocation: shipmentData.currentLocation || '',
        currentLatitude: shipmentData.currentLatitude || null,
        currentLongitude: shipmentData.currentLongitude || null,
        estimatedDelivery: shipmentData.estimatedDelivery || null,
        courierName: shipmentData.courierName || '',
        courierEmail: shipmentData.courierEmail || '',
        vehicleType: shipmentData.vehicleType || '',
        priority: shipmentData.priority || 'normal',
        insuranceType: shipmentData.insuranceType || 'none',
        declaredValue: shipmentData.declaredValue || '0',
        temperature: shipmentData.temperature || '',
        specialInstructions: shipmentData.specialInstructions || '',
        isFragile: shipmentData.isFragile || false,
        isHazardous: shipmentData.isHazardous || false,
        isPerishable: shipmentData.isPerishable || false,
        senderCompany: shipmentData.senderCompany || '',
        senderTaxId: shipmentData.senderTaxId || '',
        referenceNumber: shipmentData.referenceNumber || '',
        costCenter: shipmentData.costCenter || '',
        internalNotes: shipmentData.internalNotes || '',
        statusHistory: [
          {
            status: 'pending',
            date: new Date().toISOString(),
            location: shipmentData.currentLocation || 'Warehouse',
            latitude: shipmentData.currentLatitude || null,
            longitude: shipmentData.currentLongitude || null,
            description: 'Shipment created',
          }
        ],
        events: []
      }
      
      shipments.unshift(newShipment)
      await jsonbinService.saveAll(shipments)
      return newShipment
    } catch (error) {
      console.error('Error creating shipment:', error)
      throw error
    }
  },

  getByTrackingCode: async (trackingCode) => {
    try {
      const shipments = await jsonbinService.getAll()
      return shipments.find(s => s.trackingCode === trackingCode) || null
    } catch (error) {
      console.error('Error getting shipment by tracking code:', error)
      return null
    }
  },

  getById: async (id) => {
    try {
      const shipments = await jsonbinService.getAll()
      return shipments.find(s => s.id === id) || null
    } catch (error) {
      console.error('Error getting shipment by id:', error)
      return null
    }
  },

  // ============================================
  // GESTION DE LA POSITION
  // ============================================

  updateLocation: async (id, location, latitude, longitude) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      shipments[index].currentLocation = location
      shipments[index].currentLatitude = latitude || null
      shipments[index].currentLongitude = longitude || null
      shipments[index].updatedAt = new Date().toISOString()

      shipments[index].statusHistory.push({
        status: shipments[index].status || 'in-transit',
        date: new Date().toISOString(),
        location: location,
        latitude: latitude || null,
        longitude: longitude || null,
        description: `Location updated: ${location}`
      })

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating location:', error)
      throw error
    }
  },

  // ============================================
  // GESTION DE LA DATE D'ARRIVÉE
  // ============================================

  updateEstimatedDelivery: async (id, estimatedDelivery) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      shipments[index].estimatedDelivery = estimatedDelivery
      shipments[index].updatedAt = new Date().toISOString()

      shipments[index].statusHistory.push({
        status: shipments[index].status || 'in-transit',
        date: new Date().toISOString(),
        location: shipments[index].currentLocation || 'System',
        description: `Estimated delivery: ${new Date(estimatedDelivery).toLocaleDateString()}`
      })

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating estimated delivery:', error)
      throw error
    }
  },

  // ============================================
  // GESTION DU LIVREUR (avec email et véhicule)
  // ============================================

  updateCourier: async (id, courierName, courierEmail, vehicleType) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      shipments[index].courierName = courierName || ''
      shipments[index].courierEmail = courierEmail || ''
      shipments[index].vehicleType = vehicleType || ''
      shipments[index].updatedAt = new Date().toISOString()

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating courier:', error)
      throw error
    }
  },

  // ============================================
  // 🆕 GESTION DE LA PRIORITÉ
  // ============================================

  updatePriority: async (id, priority) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      shipments[index].priority = priority || 'normal'
      shipments[index].updatedAt = new Date().toISOString()

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating priority:', error)
      throw error
    }
  },

  // ============================================
  // 🆕 GESTION DE L'ASSURANCE
  // ============================================

  updateInsurance: async (id, insuranceType, declaredValue) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      shipments[index].insuranceType = insuranceType || 'none'
      shipments[index].declaredValue = declaredValue || '0'
      shipments[index].updatedAt = new Date().toISOString()

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating insurance:', error)
      throw error
    }
  },

  // ============================================
  // 🆕 GESTION DES FLAGS SPÉCIAUX
  // ============================================

  updateSpecialFlags: async (id, flags) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      shipments[index].isFragile = flags.isFragile || false
      shipments[index].isHazardous = flags.isHazardous || false
      shipments[index].isPerishable = flags.isPerishable || false
      shipments[index].temperature = flags.temperature || ''
      shipments[index].specialInstructions = flags.specialInstructions || ''
      shipments[index].updatedAt = new Date().toISOString()

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating special flags:', error)
      throw error
    }
  },

  // ============================================
  // GESTION DU STATUT
  // ============================================

  updateStatus: async (id, newStatus, location, description) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      const statusEntry = {
        status: newStatus,
        date: new Date().toISOString(),
        location: location || shipments[index].currentLocation || 'Unknown',
        latitude: shipments[index].currentLatitude || null,
        longitude: shipments[index].currentLongitude || null,
        description: description || `Status changed to ${newStatus}`,
      }

      shipments[index].status = newStatus
      shipments[index].statusHistory = [
        statusEntry,
        ...(shipments[index].statusHistory || [])
      ]
      shipments[index].updatedAt = new Date().toISOString()

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  },

  // ============================================
  // AJOUT D'UN ÉVÉNEMENT
  // ============================================

  addEvent: async (id, event) => {
    try {
      const shipments = await jsonbinService.getAll()
      const index = shipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')

      const newEvent = {
        ...event,
        timestamp: new Date().toISOString(),
        eventId: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      }

      shipments[index].events = [
        newEvent,
        ...(shipments[index].events || [])
      ]
      shipments[index].updatedAt = new Date().toISOString()

      await jsonbinService.saveAll(shipments)
      return shipments[index]
    } catch (error) {
      console.error('Error adding event:', error)
      throw error
    }
  },

  // ============================================
  // SUPPRESSION D'UN COLIS
  // ============================================

  delete: async (id) => {
    try {
      const shipments = await jsonbinService.getAll()
      const filtered = shipments.filter(s => s.id !== id)
      await jsonbinService.saveAll(filtered)
      return true
    } catch (error) {
      console.error('Error deleting shipment:', error)
      return false
    }
  },

  // ============================================
  // STATISTIQUES
  // ============================================

  getStats: async () => {
    try {
      const shipments = await jsonbinService.getAll()
      const total = shipments.length
      const inTransit = shipments.filter(s => s.status === 'in-transit').length
      const delivered = shipments.filter(s => s.status === 'delivered').length
      const pending = shipments.filter(s => s.status === 'pending').length
      const delayed = shipments.filter(s => s.status === 'delayed').length

      return { total, inTransit, delivered, pending, delayed }
    } catch (error) {
      console.error('Error getting stats:', error)
      return { total: 0, inTransit: 0, delivered: 0, pending: 0, delayed: 0 }
    }
  },

  // ============================================
  // RÉSUMÉ D'UN COLIS POUR L'UTILISATEUR
  // ============================================

  getTrackingSummary: async (trackingCode) => {
    try {
      const shipment = await jsonbinService.getByTrackingCode(trackingCode)
      if (!shipment) return null

      let timeRemaining = null
      if (shipment.estimatedDelivery) {
        const now = new Date()
        const target = new Date(shipment.estimatedDelivery)
        const diff = target - now
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          timeRemaining = days > 0 ? `${days}d ${hours}h` : `${hours}h`
        } else {
          timeRemaining = 'Delivery today'
        }
      }

      let progress = 0
      if (shipment.status === 'pending') progress = 25
      else if (shipment.status === 'in-transit') progress = 60
      else if (shipment.status === 'delivered') progress = 100
      else if (shipment.status === 'delayed') progress = 40

      return {
        ...shipment,
        timeRemaining,
        progress,
        statusLabel: {
          pending: 'Pending',
          'in-transit': 'In Transit',
          delivered: 'Delivered',
          delayed: 'Delayed',
        }[shipment.status] || shipment.status
      }
    } catch (error) {
      console.error('Error getting tracking summary:', error)
      return null
    }
  }
}

export default jsonbinService