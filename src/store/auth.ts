import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '../types'

// Mock users for demo - remove when connecting to real backend
const mockUsers = [
  {
    id: '1',
    email: 'admin@centralpets.com',
    password: 'admin123',
    name: 'Administrador',
    phone: '+1 (555) 123-4567',
    address: '123 Pet Street, City, State 12345',
    role: 'admin' as const,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'cliente@example.com',
    password: 'cliente123',
    name: 'María González',
    phone: '+1 (555) 987-6543',
    address: '456 Animal Ave, Pet City, PC 67890',
    role: 'customer' as const,
    created_at: '2024-01-01T00:00:00Z'
  }
]

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  login: (email: string, password: string) => Promise<User>
  register: (userData: {
    name: string
    email: string
    password: string
    phone?: string
    address?: string
  }) => Promise<User>
  logout: () => Promise<void>
  updateProfile: (userData: {
    name?: string
    email?: string
    phone?: string
    address?: string
  }) => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      error: null,
      
      setUser: (user) => {
        set({ user, isLoading: false, error: null })
      },
      
      setLoading: (isLoading) => set({ isLoading }),
      
      setError: (error) => set({ error }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800))

          // Limpiar espacios y normalizar email y password
          const cleanEmail = email.trim().toLowerCase()
          const cleanPassword = password.trim()

          // Buscar usuario en mock data (email insensible a mayúsculas)
          const user = mockUsers.find(
            u => u.email.trim().toLowerCase() === cleanEmail && u.password.trim() === cleanPassword
          )

          if (!user) {
            throw new Error('Email o contraseña incorrectos. Verifica tus credenciales.')
          }

          // Remove password from user object
          const { password: _, ...userWithoutPassword } = user

          set({ user: userWithoutPassword, isLoading: false, error: null })
          return userWithoutPassword
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Check if email already exists
          const existingUser = mockUsers.find(u => u.email === userData.email)
          if (existingUser) {
            throw new Error('Este email ya está registrado. Intenta con otro email o inicia sesión.')
          }
          
          // Create new user
          const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            phone: userData.phone || '',
            address: userData.address || '',
            role: 'customer' as const,
            created_at: new Date().toISOString()
          }
          
          // Add to mock users (in real app, this would be handled by backend)
          mockUsers.push({ ...newUser, password: userData.password })
          
          set({ user: newUser, isLoading: false, error: null })
          return newUser
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
          console.error('Logout error:', error)
        } finally {
          set({ user: null, isLoading: false, error: null })
        }
      },

      updateProfile: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          const currentUser = get().user
          if (!currentUser) {
            throw new Error('Usuario no autenticado')
          }
          
          const updatedUser = { ...currentUser, ...userData }
          set({ user: updatedUser, isLoading: false, error: null })
        } catch (error: any) {
          set({ error: error.message, isLoading: false })
          throw error
        }
      },

      checkAuth: async () => {
        try {
          // For demo purposes, just set loading to false
          // In real app, this would check for valid token and fetch user data
          await new Promise(resolve => setTimeout(resolve, 300))
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false, error: null })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
)

// Clear error after some time
let errorTimeout: NodeJS.Timeout

useAuthStore.subscribe((state) => {
  if (state.error) {
    clearTimeout(errorTimeout)
    errorTimeout = setTimeout(() => {
      useAuthStore.getState().setError(null)
    }, 5000) // Clear error after 5 seconds
  }
})