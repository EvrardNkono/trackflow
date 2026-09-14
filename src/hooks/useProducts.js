// src/hooks/useProducts.js
import { useState, useEffect, useCallback, useMemo } from 'react'
import productService from '../services/productService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await productService.getAll()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const stats = useMemo(() => {
    const total = products.length
    const active = products.filter(p => p.status === 'active').length
    const draft = products.filter(p => p.status === 'draft').length
    const archived = products.filter(p => p.status === 'archived').length
    const outOfStock = products.filter(p => Number(p.stock) <= 0).length

    return { total, active, draft, archived, outOfStock }
  }, [products])

  const createProduct = useCallback(async (data) => {
    try {
      setLoading(true)
      const newProduct = await productService.create(data)
      setProducts(prev => [newProduct, ...prev])
      return newProduct
    } catch (err) {
      setError(err.message || 'Failed to create product')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const getProduct = useCallback(async (id) => {
    try {
      setLoading(true)
      return await productService.getById(id)
    } catch (err) {
      setError(err.message || 'Failed to get product')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateProduct = useCallback(async (id, data) => {
    try {
      setLoading(true)
      const updated = await productService.update(id, data)
      setProducts(prev => prev.map(p => p.id === id ? updated : p))
      return updated
    } catch (err) {
      setError(err.message || 'Failed to update product')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteProduct = useCallback(async (id) => {
    try {
      setLoading(true)
      const success = await productService.delete(id)
      if (success) {
        setProducts(prev => prev.filter(p => p.id !== id))
      }
      return success
    } catch (err) {
      setError(err.message || 'Failed to delete product')
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const searchProducts = useCallback((query) => {
    if (!query) return products
    const q = query.toLowerCase()
    return products.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q)
    )
  }, [products])

  const filterByStatus = useCallback((status) => {
    if (!status || status === 'all') return products
    return products.filter(p => p.status === status)
  }, [products])

  const filterByCategory = useCallback((category) => {
    if (!category || category === 'all') return products
    return products.filter(p => p.category === category)
  }, [products])

  return {
    products,
    loading,
    error,
    stats,

    loadProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,

    searchProducts,
    filterByStatus,
    filterByCategory,
  }
}

export default useProducts
