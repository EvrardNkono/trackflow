// src/pages/ShopPage.jsx
import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Search, ShoppingBag, ImageOff, Plus } from 'lucide-react'
import useProducts from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

const ShopPage = () => {
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')

  const activeProducts = useMemo(
    () => products.filter(p => p.status === 'active'),
    [products]
  )

  const categories = useMemo(() => {
    const set = new Set(activeProducts.map(p => p.category).filter(Boolean))
    return ['all', ...Array.from(set)]
  }, [activeProducts])

  const filteredProducts = activeProducts.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = category === 'all' || p.category === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400" />
          <div className="container-custom relative text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Shop</h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Shipping supplies and accessories, delivered by TrackFlow.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="container-custom py-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            {categories.length > 1 && (
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                ))}
              </select>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              No products available right now.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => navigate(`/shop/${product.id}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/shop/${product.id}`)
                  }}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group relative cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {product.images?.[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageOff className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                    {product.category && (
                      <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-orange-600">{product.currency} {product.price}</span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-gray-400 line-through">{product.currency} {product.compareAtPrice}</span>
                      )}
                    </div>
                    {Number(product.stock) <= 0 ? (
                      <span className="inline-block mt-2 text-xs font-semibold text-red-600">Out of stock</span>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          addItem(product)
                        }}
                        className="mt-3 w-full flex items-center justify-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ShopPage
