import axios from 'axios'

import { API_URL } from '../utils/constants'

const api = axios.create({
  baseURL: `${API_URL}/api/users`,
  withCredentials: true,
})

const register = async (registerData: RegisterValues): Promise<User> => {
  const { data } = await api.post('/register', registerData)
  return data
}
const login = async (loginData: LoginValues): Promise<User> => {
  const { data } = await api.post('/login', loginData)
  return data
}

const logout = async (): Promise<User> => {
  const { data } = await api.post('/logout')
  return data
}

const getCurrentUser = async (): Promise<User> => {
  const { data } = await api.get(`/`)
  return data
}

const getUser = async (userId: string): Promise<User> => {
  const { data } = await api.get(`/${userId}`)
  return data
}

const getSearched = async (searchData: SearchValues): Promise<User[]> => {
  if (!searchData.firstName) return []
  const { data } = await api.get('/search', {
    params: searchData,
  })
  return data
}

const updateUser = async (updateData: UpdateUserValues): Promise<User> => {
  const { data } = await api.patch(`/`, updateData)
  return data
}

const requestFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/request`)
  return data
}

const acceptFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/accept`)
  return data
}

const rejectFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/reject`)
  return data
}
const removeFriend = async (otherUserId: string): Promise<User> => {
  const { data } = await api.patch(`/${otherUserId}/friend/remove`)
  return data
}

const usersAPI = {
  register,
  login,
  logout,
  getCurrentUser,
  getUser,
  getSearched,
  updateUser,
  requestFriend,
  acceptFriend,
  rejectFriend,
  removeFriend,
}

export default usersAPI
