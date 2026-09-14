// src/config.js

const CONFIG = {
  JSONBIN: {
    BIN_ID: import.meta.env.VITE_JSONBIN_BIN_ID,
    API_KEY: import.meta.env.VITE_JSONBIN_API_KEY,
    BASE_URL: 'https://api.jsonbin.io/v3/b',
  },
  JSONBIN_PRODUCTS: {
    // Separate bin so shipment saves never overwrite product data (and vice versa)
    BIN_ID: import.meta.env.VITE_JSONBIN_PRODUCTS_BIN_ID,
    API_KEY: import.meta.env.VITE_JSONBIN_API_KEY,
    BASE_URL: 'https://api.jsonbin.io/v3/b',
  },
  CLOUDINARY: {
    CLOUD_NAME: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    UPLOAD_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    UPLOAD_URL: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
  }
}

export default CONFIG