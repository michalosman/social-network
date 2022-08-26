export const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development'

export const SERVER_URL = import.meta.env.SERVER_URL || 'http://localhost:5000'
export const API_URL = NODE_ENV === 'production' ? '' : SERVER_URL

export const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL
export const CLOUDINARY_UPLOAD_PRESET = import.meta.env
  .VITE_CLOUDINARY_UPLOAD_PRESET

export const TEST_USER_ID = import.meta.env.VITE_TEST_USER_ID
