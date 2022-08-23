/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import * as usersAPI from '../api/usersAPI'

interface AuthContextType {
  user: User
  error: any
  isLoading: boolean
  initialLoading: boolean
  setError: React.Dispatch<any>
  register: (registerData: RegisterValues) => void
  login: (loginData: LoginValues) => void
  logout: () => void
  logoutAll: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const initialUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  friends: [],
  friendRequests: [],
  posts: [],
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(initialUser)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)

  useEffect(() => {
    autoLogin()
  }, [])

  const autoLogin = async () => {
    try {
      const user = await usersAPI.getCurrentUser()
      setUser(user)
    } catch (error: any) {
      setError(null)
    } finally {
      setInitialLoading(false)
    }
  }

  const register = async (registerData: RegisterValues) => {
    setError(null)
    setIsLoading(true)

    try {
      const user = await usersAPI.register(registerData)
      setUser(user)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (loginData: LoginValues) => {
    setError(null)
    setIsLoading(true)

    try {
      const user = await usersAPI.login(loginData)
      setUser(user)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setError(null)
    setIsLoading(true)

    try {
      await usersAPI.logout()
      setUser(initialUser)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  const logoutAll = async () => {
    setError(null)
    setIsLoading(true)

    try {
      await usersAPI.logoutAll()
      setUser(initialUser)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      user,
      error,
      isLoading,
      initialLoading,
      setError,
      register,
      login,
      logout,
      logoutAll,
    }),
    [user, isLoading, initialLoading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
