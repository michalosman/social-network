import axios from 'axios'

const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}/api/comments` ||
  'http://localhost:5000/api/comments'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const createComment = async (
  createCommentValues: CreateCommentValues
): Promise<Comment> => {
  const { postId, text } = createCommentValues
  const { data } = await api.post(`/${postId}`, { text })
  return data
}

export const getComments = async (postId: string) => {
  const { data } = await api.get(`/${postId}`)
  return data
}
