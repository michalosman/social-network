import axios from 'axios'

const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}/api/comments` ||
  'http://localhost:5000/api/comments'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

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
