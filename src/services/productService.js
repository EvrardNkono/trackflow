// src/services/productService.js
import CONFIG from '../config'

const JSONBIN_URL = `${CONFIG.JSONBIN_PRODUCTS.BASE_URL}/${CONFIG.JSONBIN_PRODUCTS.BIN_ID}`
const API_KEY = CONFIG.JSONBIN_PRODUCTS.API_KEY

export const productService = {
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
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      return data.record?.products || []
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  saveAll: async (products) => {
    try {
      const response = await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
          'X-Access-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        throw new Error(`Failed to save products: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error saving products:', error)
      throw error
    }
  },

  // ============================================
  // GESTION DES PRODUITS
  // ============================================

  create: async (productData) => {
    try {
      const products = await productService.getAll()

      const newProduct = {
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),

        // 📦 Basic info
        name: productData.name || '',
        description: productData.description || '',
        category: productData.category || '',
        sku: productData.sku || '',

        // 💰 Pricing & stock
        price: productData.price || '0',
        compareAtPrice: productData.compareAtPrice || '',
        currency: productData.currency || 'USD',
        stock: productData.stock ?? 0,
        status: productData.status || 'active', // active | draft | archived

        // 🖼️ Images — array of { url, publicId }, max 4
        images: (productData.images || []).slice(0, 4),

        // 📋 Extra
        weight: productData.weight || '',
        dimensions: productData.dimensions || '',
        tags: productData.tags || [],
      }

      products.unshift(newProduct)
      await productService.saveAll(products)
      return newProduct
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  },

  getById: async (id) => {
    try {
      const products = await productService.getAll()
      return products.find(p => p.id === id) || null
    } catch (error) {
      console.error('Error getting product by id:', error)
      return null
    }
  },

  update: async (id, productData) => {
    try {
      const products = await productService.getAll()
      const index = products.findIndex(p => p.id === id)
      if (index === -1) throw new Error('Product not found')

      products[index] = {
        ...products[index],
        ...productData,
        images: productData.images ? productData.images.slice(0, 4) : products[index].images,
        updatedAt: new Date().toISOString(),
      }

      await productService.saveAll(products)
      return products[index]
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    }
  },

  delete: async (id) => {
    try {
      const products = await productService.getAll()
      const filtered = products.filter(p => p.id !== id)
      await productService.saveAll(filtered)
      return true
    } catch (error) {
      console.error('Error deleting product:', error)
      return false
    }
  },

  // ============================================
  // STATISTIQUES
  // ============================================

  getStats: async () => {
    try {
      const products = await productService.getAll()
      const total = products.length
      const active = products.filter(p => p.status === 'active').length
      const draft = products.filter(p => p.status === 'draft').length
      const archived = products.filter(p => p.status === 'archived').length
      const outOfStock = products.filter(p => Number(p.stock) <= 0).length

      return { total, active, draft, archived, outOfStock }
    } catch (error) {
      console.error('Error getting product stats:', error)
      return { total: 0, active: 0, draft: 0, archived: 0, outOfStock: 0 }
    }
  },
}

export default productService
