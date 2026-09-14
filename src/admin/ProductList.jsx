// src/admin/ProductList.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingBag, Trash2, Edit, Plus, ImageOff } from 'lucide-react'
import useProducts from '../hooks/useProducts'

const ProductList = () => {
  const { products, deleteProduct, loading } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-700',
    archived: 'bg-red-100 text-red-800',
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete product "${name}"? This cannot be undone.`)) {
      await deleteProduct(id)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Products</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Total: <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          </div>
          <Link
            to="/admin/products/create"
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            New Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by name, SKU or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    No products found
                    <div>
                      <Link to="/admin/products/create" className="text-orange-600 hover:underline text-sm">
                        Create your first product
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {product.images?.[0]?.url ? (
                          <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageOff className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.sku}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.category || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">{product.currency} {product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={Number(product.stock) <= 0 ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[product.status] || 'bg-gray-100 text-gray-800'}`}>
                        {product.status?.toUpperCase() || 'DRAFT'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/products/update/${product.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="text-orange-600 hover:text-orange-800 font-medium text-sm"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ProductList
