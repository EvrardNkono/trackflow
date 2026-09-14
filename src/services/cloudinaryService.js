// src/services/cloudinaryService.js
import CONFIG from '../config'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif', 'image/gif']
const MAX_FILE_SIZE_MB = 10

const validateFile = (file) => {
  if (!file) throw new Error('No file provided')
  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    throw new Error(`Image "${file.name}" exceeds ${MAX_FILE_SIZE_MB}MB`)
  }
  if (ALLOWED_TYPES.length && !ALLOWED_TYPES.includes(file.type)) {
    // Don't hard-block on type (browsers report jfif/heic inconsistently),
    // just warn — Cloudinary's own preset restrictions are the real gate.
    console.warn(`Unusual file type for "${file.name}": ${file.type}`)
  }
}

export const cloudinaryService = {
  /**
   * Upload a single image file to Cloudinary using the unsigned upload preset.
   * Returns the public secure URL of the uploaded image.
   */
  uploadImage: async (file, folder = 'trackflow/products') => {
    validateFile(file)

    if (!CONFIG.CLOUDINARY.CLOUD_NAME || !CONFIG.CLOUDINARY.UPLOAD_PRESET) {
      throw new Error('Cloudinary is not configured. Check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CONFIG.CLOUDINARY.UPLOAD_PRESET)
    if (folder) formData.append('folder', folder)

    const response = await fetch(CONFIG.CLOUDINARY.UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData?.error?.message || 'Failed to upload image to Cloudinary')
    }

    const data = await response.json()
    return {
      url: data.secure_url,
      publicId: data.public_id,
    }
  },

  /**
   * Upload multiple images in parallel. Returns array of { url, publicId }
   * in the same order as the input files. Throws if any upload fails.
   */
  uploadImages: async (files, folder = 'trackflow/products') => {
    const uploads = Array.from(files).map((file) => cloudinaryService.uploadImage(file, folder))
    return Promise.all(uploads)
  },
}

export default cloudinaryService
