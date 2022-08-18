import axios from 'axios'

const SERVER_URL =
  `${process.env.REACT_APP_SERVER_URL}/users` ||
  'http://localhost:5000/api/users'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => api.post('/register', { firstName, lastName, email, password })

export const login = (email: string, password: string) =>
  api.post('/login', { email, password })

export const logout = () => api.post('/logout')

export const logoutAll = () => api.post('/logout/all')

export const searchUsers = (
  firstName: string,
  lastName: string,
  limit: number
) => api.get('/search', { params: { firstName, lastName, limit } })

export const getUserProfile = (userId: string) => api.get(`/profile/${userId}`)

export const requestFriend = (otherUserId: string) =>
  api.patch(`/${otherUserId}/friend/request`)

export const acceptFriend = (otherUserId: string) =>
  api.patch(`/${otherUserId}/friend/accept`)

export const rejectFriend = (otherUserId: string) =>
  api.patch(`/${otherUserId}/friend/reject`)

export const removeFriend = (otherUserId: string) =>
  api.patch(`/${otherUserId}/friend/remove`)
