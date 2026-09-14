// src/admin/ProductImageUploader.jsx
import React, { useState } from 'react'
import { Upload, X, Loader2, ImagePlus } from 'lucide-react'
import cloudinaryService from '../services/cloudinaryService'
import toast from 'react-hot-toast'

const MAX_IMAGES = 4

/**
 * images: array of { url, publicId }
 * onChange(images) called whenever the set changes
 */
const ProductImageUploader = ({ images = [], onChange }) => {
  const [uploadingCount, setUploadingCount] = useState(0)

  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const remainingSlots = MAX_IMAGES - images.length
    if (remainingSlots <= 0) {
      toast.error(`Maximum ${MAX_IMAGES} images per product`)
      e.target.value = ''
      return
    }

    const filesToUpload = files.slice(0, remainingSlots)
    setUploadingCount(filesToUpload.length)

    try {
      const uploaded = await cloudinaryService.uploadImages(filesToUpload)
      onChange([...images, ...uploaded])
      toast.success(`${uploaded.length} image(s) uploaded`)
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Image upload failed')
    } finally {
      setUploadingCount(0)
      e.target.value = ''
    }
  }

  const handleRemove = (index) => {
    const next = images.filter((_, i) => i !== index)
    onChange(next)
  }

  const slotsLeft = MAX_IMAGES - images.length

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={img.publicId || index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
            <img src={img.url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-1 shadow-md transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            {index === 0 && (
              <span className="absolute bottom-1 left-1 bg-orange-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                Main
              </span>
            )}
          </div>
        ))}

        {slotsLeft > 0 && (
          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 flex flex-col items-center justify-center gap-2 cursor-pointer text-gray-500 hover:text-orange-600 transition-colors">
            {uploadingCount > 0 ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">Uploading...</span>
              </>
            ) : (
              <>
                <ImagePlus className="w-6 h-6" />
                <span className="text-xs text-center px-2">Add image{slotsLeft > 1 ? `s (${slotsLeft} left)` : ''}</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple={slotsLeft > 1}
              onChange={handleFilesSelected}
              disabled={uploadingCount > 0}
              className="hidden"
            />
          </label>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        <Upload className="w-3 h-3" />
        Up to {MAX_IMAGES} images. First image is used as the main product photo.
      </p>
    </div>
  )
}

export default ProductImageUploader
