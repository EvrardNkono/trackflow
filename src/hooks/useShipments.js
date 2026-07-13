// src/hooks/useShipments.js
import { useState, useEffect, useCallback } from 'react'
import jsonbinService from '../services/jsonbinService'

export const useShipments = () => {
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const updateStatus = useCallback(async (id, status, location, description) => {
    try {
      setLoading(true)
      const updated = await jsonbinService.updateStatus(id, status, location, description)
      setShipments(prev => prev.map(s => s.id === id ? updated : s))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update status')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  // 🆕 Mise à jour de la position
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

  // 🆕 Mise à jour de la date d'arrivée estimée
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

  // 🆕 Mise à jour du livreur (avec email et véhicule)
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

  // 🆕 Mise à jour de la priorité
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

  // 🆕 Mise à jour de l'assurance
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

  // 🆕 Mise à jour des flags spéciaux
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

  const getStats = useCallback(async () => {
    try {
      return await jsonbinService.getStats()
    } catch (err) {
      setError(err.message || 'Failed to get stats')
      return { total: 0, inTransit: 0, delivered: 0, pending: 0, delayed: 0 }
    }
  }, [])

  return {
    // Données
    shipments,
    loading,
    error,
    
    // Actions
    loadShipments,
    createShipment,
    updateStatus,
    updateLocation,
    updateEstimatedDelivery,
    updateCourier,
    updatePriority,
    updateInsurance,
    updateSpecialFlags,
    deleteShipment,
    getStats,
  }
}

export default useShipments