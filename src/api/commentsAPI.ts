import axios from 'axios'

const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}/api/comments` ||
  'http://localhost:5000/api/comments'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const create = async (
  postId: string,
  text: string
): Promise<Comment> => {
  const { data } = await api.post(`/${postId}`, { text })
  return data
}

export const get = async (postId: string) => {
  const { data } = await api.get(`/${postId}`)
  return data
}
