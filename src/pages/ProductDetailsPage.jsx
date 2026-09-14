// src/pages/ProductDetailsPage.jsx
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { ImageOff, ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react'
import useProducts from '../hooks/useProducts'
import { useCart } from '../context/CartContext'

const ProductDetailsPage = () => {
  const { id } = useParams()
  const { getProduct } = useProducts()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const load = async () => {
      const data = await getProduct(id)
      setProduct(data)
      setLoading(false)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-custom py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </Link>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          </div>
        ) : !product || product.status !== 'active' ? (
          <div className="text-center py-16 text-gray-500">
            Product not found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Gallery */}
            <div>
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
                {product.images?.[activeImage]?.url ? (
                  <img src={product.images[activeImage].url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <ImageOff className="w-10 h-10 text-gray-300" />
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, index) => (
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
              {product.category && (
                <p className="text-sm text-orange-600 font-medium mb-2">{product.category}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-orange-600">{product.currency} {product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-gray-400 line-through">{product.currency} {product.compareAtPrice}</span>
                )}
              </div>

              {product.description && (
                <p className="text-gray-700 mb-6 whitespace-pre-line">{product.description}</p>
              )}

              <div className="mb-6">
                {Number(product.stock) > 0 ? (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    In stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                    Out of stock
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-200 pt-4">
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
              </div>

              {/* Quantity + Add to Cart */}
              {Number(product.stock) > 0 && (
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex items-center gap-3 border-2 border-gray-200 rounded-lg px-3 py-2">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(Number(product.stock), q + 1))}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => addItem(product, quantity)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default ProductDetailsPage
