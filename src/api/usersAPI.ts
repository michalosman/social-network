import axios from 'axios'

const SERVER_URL =
  `${import.meta.env.VITE_SERVER_URL}/api/users` ||
  'http://localhost:5000/api/users'

const api = axios.create({ baseURL: SERVER_URL, withCredentials: true })

export const register = async (registerData: RegisterValues): Promise<User> => {
  const { data } = await api.post('/register', registerData)
  return data
}
export const login = async (loginData: LoginValues): Promise<User> => {
  const { data } = await api.post('/login', loginData)
  return data
}

export const logout = async (): Promise<User> => {
  const { data } = await api.post('/logout')
  return data
}

export const getSearched = async (
  searchData: SearchValues
): Promise<User[]> => {
  if (!searchData.firstName) return []
  const { data } = await api.get('/search', {
    params: searchData,
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

export const updateUser = async (
  updateData: UpdateUserValues
): Promise<User> => {
  const { data } = await api.patch(`/`, updateData)
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
