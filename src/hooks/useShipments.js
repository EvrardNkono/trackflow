// src/hooks/useShipments.js
import { useState, useEffect, useCallback, useMemo } from 'react'
import jsonbinService from '../services/jsonbinService'

export const useShipments = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ============================================
  // CHARGEMENT
  // ============================================

  const loadShipments = useCallback(async () => {
    try {
      setLoading(true)
      const data = await jsonbinService.getAll()
      setShipments(data)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load shipments')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadShipments()
  }, [loadShipments])

  // ============================================
  // STATISTIQUES (calculées automatiquement)
  // ============================================

  const stats = useMemo(() => {
    const total = shipments.length
    const inTransit = shipments.filter(s => s.status === 'in-transit').length
    const delivered = shipments.filter(s => s.status === 'delivered').length
    const pending = shipments.filter(s => s.status === 'pending').length
    const delayed = shipments.filter(s => s.status === 'delayed').length
    const cancelled = shipments.filter(s => s.status === 'cancelled').length
    
    return { total, inTransit, delivered, pending, delayed, cancelled }
  }, [shipments])

  // ============================================
  // CRUD
  // ============================================

  const createShipment = useCallback(async (data) => {
    try {
      setLoading(true)
      const newShipment = await jsonbinService.create(data)
      setShipments(prev => [newShipment, ...prev])
      return newShipment
    } catch (err) {
      setError(err.message || 'Failed to create shipment')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const getShipment = useCallback(async (id) => {
    try {
      setLoading(true)
      const shipment = await jsonbinService.getById(id)
      return shipment
    } catch (err) {
      setError(err.message || 'Failed to get shipment')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const getShipmentByTracking = useCallback(async (trackingCode) => {
    try {
      setLoading(true)
      const shipment = await jsonbinService.getByTrackingCode(trackingCode)
      return shipment
    } catch (err) {
      setError(err.message || 'Failed to get shipment by tracking code')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateShipment = useCallback(async (id, data) => {
    try {
      setLoading(true)
      const allShipments = await jsonbinService.getAll()
      const index = allShipments.findIndex(s => s.id === id)
      if (index === -1) throw new Error('Shipment not found')
      
      const updated = {
        ...allShipments[index],
        ...data,
        updatedAt: new Date().toISOString()
      }
      allShipments[index] = updated
      await jsonbinService.saveAll(allShipments)
      
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update shipment')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteShipment = useCallback(async (id) => {
    try {
      setLoading(true)
      const success = await jsonbinService.delete(id)
      if (success) {
        setShipments(prev => prev.filter(s => s.id !== id))
      }
      return success
    } catch (err) {
      setError(err.message || 'Failed to delete shipment')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  // ============================================
  // MISES À JOUR SPÉCIFIQUES
  // ============================================

  // src/hooks/useShipments.js

// ============================================
// MISES À JOUR SPÉCIFIQUES
// ============================================

// src/hooks/useShipments.js

const updateStatus = useCallback(async (id, status, location, description, statusDetails) => {
  try {
    setLoading(true)
    const updated = await jsonbinService.updateStatus(id, status, location, description, statusDetails)
    
    // ✅ AJOUTER CETTE LIGNE POUR METTRE À JOUR L'ÉTAT LOCAL
    setShipments(prev => prev.map(s => s.id === id ? updated : s))
    
    return updated
  } catch (err) {
    setError(err.message || 'Failed to update status')
    return null
  } finally {
    setLoading(false)
  }
}, [])

  const updateLocation = useCallback(async (id, location, latitude, longitude) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updateLocation(id, location, latitude, longitude)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update location')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateEstimatedDelivery = useCallback(async (id, estimatedDelivery) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updateEstimatedDelivery(id, estimatedDelivery)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update estimated delivery')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateCourier = useCallback(async (id, courierName, courierEmail, vehicleType) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updateCourier(id, courierName, courierEmail, vehicleType)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update courier')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePriority = useCallback(async (id, priority) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updatePriority(id, priority)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update priority')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateInsurance = useCallback(async (id, insuranceType, declaredValue) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updateInsurance(id, insuranceType, declaredValue)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update insurance')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateSpecialFlags = useCallback(async (id, flags) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updateSpecialFlags(id, flags)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update special flags')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const addEvent = useCallback(async (id, event) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.addEvent(id, event)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to add event')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // ============================================
  // RECHERCHE ET FILTRES
  // ============================================

  const searchShipments = useCallback((query) => {
    if (!query) return shipments
    const q = query.toLowerCase()
    return shipments.filter(s => 
      s.trackingCode?.toLowerCase().includes(q) ||
      s.recipientName?.toLowerCase().includes(q) ||
      s.recipientEmail?.toLowerCase().includes(q) ||
      s.currentLocation?.toLowerCase().includes(q)
    )
  }, [shipments])

  const filterByStatus = useCallback((status) => {
    if (!status) return shipments
    return shipments.filter(s => s.status === status)
  }, [shipments])

  const filterByPriority = useCallback((priority) => {
    if (!priority) return shipments
    return shipments.filter(s => s.priority === priority)
  }, [shipments])

  // ============================================
  // RETOUR DU HOOK
  // ============================================

  return {
    // Données
    shipments,
    loading,
    error,
    stats,
    
    // Actions CRUD
    loadShipments,
    createShipment,
    getShipment,
    getShipmentByTracking,
    updateShipment,
    deleteShipment,
    
    // Actions spécifiques
    updateStatus,
    updateLocation,
    updateEstimatedDelivery,
    updateCourier,
    updatePriority,
    updateInsurance,
    updateSpecialFlags,
    addEvent,
    
    // Filtres et recherche
    searchShipments,
    filterByStatus,
    filterByPriority,
  }
}

export default useShipments