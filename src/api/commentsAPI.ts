import axios from 'axios'

import { API_URL } from '../utils/constants'

const api = axios.create({
  baseURL: `${API_URL}/api/comments`,
  withCredentials: true,
})

const createComment = async (
  createCommentData: CreateCommentValues
): Promise<Comment> => {
  const { postId, text } = createCommentData
  const { data } = await api.post(`/${postId}`, { text })
  return data
}

const getComments = async (postId: string) => {
  const { data } = await api.get(`/${postId}`)
  return data
}

const commentsAPI = { createComment, getComments }

export default commentsAPI
