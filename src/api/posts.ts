import axios from 'axios'

const SERVER_URL =
  `${process.env.REACT_APP_SERVER_URL}/posts` ||
  'http://localhost:5000/api/posts'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const createPost = (text: string) => api.post('/', { text })

export const getOwnFeed = (offset: number, limit: number) =>
  api.get('/feed', { params: { offset, limit } })

export const getUserTimeline = (
  userId: string,
  offset: number,
  limit: number
) => api.get(`/timeline/${userId}`, { params: { offset, limit } })

export const likePost = (postId: string) => api.patch(`/${postId}/like`)

export const unlikePost = (postId: string) => api.patch(`/${postId}/unlike`)
