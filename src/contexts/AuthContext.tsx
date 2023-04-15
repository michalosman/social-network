import React, { createContext, useEffect, useMemo, useState } from 'react'

import usersAPI from '../api/usersAPI'

interface AuthContextType {
  user: User | null
  error: any
  isLoading: boolean
  initialLoading: boolean
  setError: React.Dispatch<any>
  register: (registerData: RegisterValues) => void
  login: (loginData: LoginValues) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)

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
      setUser(null)
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
    }),
    [user, isLoading, initialLoading, error]
  )

  useEffect(() => {
    autoLogin()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
