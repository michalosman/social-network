import axios from 'axios'

const SERVER_URL =
  `${process.env.REACT_APP_SERVER_URL}/comments` ||
  'http://localhost:5000/api/comments'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const createComment = (postId: string, text: string) =>
  api.post(`/${postId}`, { text })

export const getPostComments = (postId: string) => api.get(`/${postId}`)
