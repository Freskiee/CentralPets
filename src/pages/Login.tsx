import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, Lock, Eye, EyeOff, Heart, PawPrint } from 'lucide-react'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Card } from '../components/UI/Card'
import { useAuthStore } from '../store/auth'

interface LoginForm {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuthStore()
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      // Clear any previous errors
      const user = await login(data.email, data.password)
      // Navigate based on user role
      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (error: any) {
      // Set form error for immediate feedback
      setError('email', { message: error.message || 'Error al iniciar sesión' })
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Heart className="h-12 w-12 text-pet-coral-500" />
            <PawPrint className="h-8 w-8 text-pet-pink-500" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta!
          </h2>
          <p className="text-gray-600">
            Inicia sesión para continuar cuidando a tu mascota
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link
              to="/register"
              className="font-medium text-pet-coral-600 hover:text-pet-coral-500"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <Card className="bg-gradient-to-r from-pet-blue-50 to-pet-mint-50 border-2 border-pet-blue-200">
          <h3 className="font-bold text-gray-900 mb-3">🎯 Credenciales de Demo:</h3>
          <div className="space-y-2 text-sm">
            <div className="bg-white rounded-lg p-3">
              <p className="font-medium text-pet-coral-600">👑 Administrador:</p>
              <p>Email: admin@centralpets.com</p>
              <p>Contraseña: admin123</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="font-medium text-pet-blue-600">👤 Cliente:</p>
              <p>Email: cliente@example.com</p>
              <p>Contraseña: cliente123</p>
            </div>
          </div>
        </Card>

        {/* Error Message */}
        {error && !isLoading && (
          <Card className="bg-red-50 border-2 border-red-200">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </Card>
        )}
        
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-pet-pink-200">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              icon={<Mail className="h-4 w-4 text-gray-400" />}
              error={errors.email?.message}
              className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
              {...register('email', {
                required: 'El email es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }
              })}
            />

            <div className="relative">
              <Input
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                icon={<Lock className="h-4 w-4 text-gray-400" />}
                error={errors.password?.message}
                className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
                {...register('password', {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pet-coral-600 focus:ring-pet-coral-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-pet-coral-600 hover:text-pet-coral-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              size="lg"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión 🐾'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}