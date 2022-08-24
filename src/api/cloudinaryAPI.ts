/* eslint-disable import/prefer-default-export */
import axios from 'axios'

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const uploadImage = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  const { data } = await axios.post(CLOUDINARY_URL, formData)

  return data.url
}

const cloudinaryAPI = { uploadImage }

export default cloudinaryAPI
