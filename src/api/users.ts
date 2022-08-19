import axios from 'axios'

const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}/users` ||
  'http://localhost:5000/api/users'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<User> => {
  const { data } = await api.post('/register', {
    firstName,
    lastName,
    email,
    password,
  })
  return data
}
export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post('/login', { email, password })
  return data
}

export const logout = async (): Promise<User> => {
  const { data } = await api.post('/logout')
  return data
}

export const logoutAll = async (): Promise<User> => {
  const { data } = await api.post('/logout/all')
  return data
}

export const getSearched = async (
  firstName: string,
  lastName: string,
  limit: number
): Promise<User[]> => {
  const { data } = await api.get('/search', {
    params: { firstName, lastName, limit },
  })
  return data
}

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get(`/`)
  return data
}

export const getUser = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/${userId}`)
  return data
}

export const requestFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/request`)
  return data
}

export const acceptFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/accept`)
  return data
}

export const rejectFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/reject`)
  return data
}
export const removeFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/remove`)
  return data
}
