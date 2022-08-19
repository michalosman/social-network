import axios from 'axios'

const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}/posts` ||
  'http://localhost:5000/api/posts'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const create = async (text: string): Promise<Post> => {
  const { data } = await api.post('/', { text })
  return data
}

export const getFeed = async (
  offset: number,
  limit: number
): Promise<Post[]> => {
  const { data } = await api.get('/feed', { params: { offset, limit } })
  return data
}

export const getTimeline = async (
  userId: string,
  offset: number,
  limit: number
): Promise<Post[]> => {
  const { data } = await api.get(`/timeline/${userId}`, {
    params: { offset, limit },
  })
  return data
}

export const like = async (postId: string): Promise<Post> => {
  const { data } = await api.patch(`/${postId}/like`)
  return data
}

export const unlike = async (postId: string): Promise<Post> => {
  const { data } = await api.patch(`/${postId}/unlike`)
  return data
}
