/* eslint-disable import/prefer-default-export */
import axios from 'axios'

import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from '../utils/constants'

const uploadImage = async (image: File) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  const { data } = await axios.post(CLOUDINARY_URL, formData)

  return data.url
}

const cloudinaryAPI = { uploadImage }

export default cloudinaryAPI
