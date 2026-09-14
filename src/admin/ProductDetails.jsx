// src/admin/ProductDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Edit, ImageOff } from 'lucide-react'
import useProducts from '../hooks/useProducts'

const statusColors = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-700',
  archived: 'bg-red-100 text-red-800',
}

const ProductDetails = () => {
  const { id } = useParams()
  const { getProduct } = useProducts()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const load = async () => {
      const data = await getProduct(id)
      setProduct(data)
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">Product not found.</p>
        <Link to="/admin/products" className="text-orange-600 hover:underline">Back to products</Link>
      </div>
    )
  }

  const images = product.images || []

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <Link to="/admin/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to products
        </Link>
        <Link
          to={`/admin/products/update/${product.id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <Edit className="w-4 h-4" />
          Edit
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-3">
            {images[activeImage]?.url ? (
              <img src={images[activeImage].url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <ImageOff className="w-10 h-10 text-gray-300" />
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={img.publicId || index}
                  onClick={() => setActiveImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    activeImage === index ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img.url} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[product.status] || 'bg-gray-100 text-gray-800'}`}>
              {product.status?.toUpperCase() || 'DRAFT'}
            </span>
            {product.sku && <span className="text-xs text-gray-400 font-mono">SKU: {product.sku}</span>}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
          {product.category && <p className="text-sm text-gray-500 mb-4">{product.category}</p>}

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-orange-600">{product.currency} {product.price}</span>
            {product.compareAtPrice && (
              <span className="text-gray-400 line-through">{product.currency} {product.compareAtPrice}</span>
            )}
          </div>

          {product.description && (
            <p className="text-gray-700 mb-6 whitespace-pre-line">{product.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-200 pt-4">
            <div>
              <p className="text-gray-500">Stock</p>
              <p className={`font-semibold ${Number(product.stock) <= 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {product.stock}
              </p>
            </div>
            {product.weight && (
              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-semibold text-gray-900">{product.weight}</p>
              </div>
            )}
            {product.dimensions && (
              <div>
                <p className="text-gray-500">Dimensions</p>
                <p className="font-semibold text-gray-900">{product.dimensions}</p>
              </div>
            )}
            <div>
              <p className="text-gray-500">Created</p>
              <p className="font-semibold text-gray-900">{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
