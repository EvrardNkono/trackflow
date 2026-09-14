// src/admin/CreateProduct.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import ProductImageUploader from './ProductImageUploader'

const CreateProduct = () => {
  const navigate = useNavigate()
  const { createProduct } = useProducts()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const [images, setImages] = useState([])

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error('Add at least one product image')
      return
    }

    try {
      const newProduct = await createProduct({ ...data, images })
      if (newProduct) {
        toast.success('Product created')
        navigate('/admin/products')
      } else {
        toast.error('Failed to create product')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create product')
    }
  }

  return (
    <div className="max-w-3xl">
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Images */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Product Images</label>
          <ProductImageUploader images={images} onChange={setImages} />
        </div>

        {/* Basic info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="e.g. Shipping Box Set (Medium)"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="Describe the product..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              {...register('category')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="e.g. Packaging"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
            <input
              {...register('sku')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="e.g. BOX-MED-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Compare-at Price</label>
            <input
              type="number"
              step="0.01"
              {...register('compareAtPrice')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="Optional original price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              {...register('currency')}
              defaultValue="USD"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="XAF">XAF</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              {...register('stock', { min: { value: 0, message: 'Stock cannot be negative' } })}
              defaultValue={0}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            />
            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              {...register('status')}
              defaultValue="active"
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input
              {...register('weight')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="e.g. 1.2kg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
            <input
              {...register('dimensions')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
              placeholder="e.g. 30x20x15cm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProduct
