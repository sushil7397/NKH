import { createContext, useContext, useEffect, useState } from 'react'

// NOTE: This is a mock auth implementation backed by localStorage so the demo
// works out of the box. Swap with Supabase / Firebase Auth in production.
const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'cakehouse@2021',
}

const AuthContext = createContext(null)
const STORAGE_KEY = 'nkh_auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = ({ username, password }) => {
    if (
      username.trim().toLowerCase() === DEMO_CREDENTIALS.username &&
      password === DEMO_CREDENTIALS.password
    ) {
      const session = {
        username: DEMO_CREDENTIALS.username,
        role: 'admin',
        signedInAt: new Date().toISOString(),
      }
      setUser(session)
      return { ok: true }
    }
    return { ok: false, message: 'Invalid username or password.' }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout, demoCredentials: DEMO_CREDENTIALS }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
