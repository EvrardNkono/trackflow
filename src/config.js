// src/config.js

const CONFIG = {
  JSONBIN: {
    BIN_ID: import.meta.env.VITE_JSONBIN_BIN_ID,
    API_KEY: import.meta.env.VITE_JSONBIN_API_KEY,
    BASE_URL: 'https://api.jsonbin.io/v3/b',
  }
}

export default CONFIG