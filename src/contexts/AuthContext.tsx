/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import * as usersAPI from '../api/users'

interface AuthContextType {
  user: User | null
  error: any
  loading: boolean
  initialLoading: boolean
  setError: React.Dispatch<any>
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void
  login: (email: string, password: string) => void
  logout: () => void
  logoutAll: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
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

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setError(null)
    setLoading(true)

    try {
      const user = await usersAPI.register(firstName, lastName, email, password)
      setUser(user)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setError(null)
    setLoading(true)

    try {
      const user = await usersAPI.login(email, password)
      setUser(user)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError(null)
    setLoading(true)

    try {
      await usersAPI.logout()
      setUser(null)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const logoutAll = async () => {
    setError(null)
    setLoading(true)

    try {
      await usersAPI.logoutAll()
      setUser(null)
    } catch (error: any) {
      setError(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  const value = useMemo(
    () => ({
      user,
      error,
      loading,
      initialLoading,
      setError,
      register,
      login,
      logout,
      logoutAll,
    }),
    [user, loading, initialLoading, error]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function useAuth() {
  return useContext(AuthContext)
}
