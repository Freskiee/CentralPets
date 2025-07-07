import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Mail, Lock, User, Phone, MapPin, Eye, EyeOff, Heart, PawPrint } from 'lucide-react'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Card } from '../components/UI/Card'
import { useAuthStore } from '../store/auth'

interface RegisterForm {
  name: string
  email: string
  phone: string
  address: string
  password: string
  confirmPassword: string
}

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { register: registerUser, isLoading, error } = useAuthStore()
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<RegisterForm>()
  const password = watch('password')

  const onSubmit = async (data: RegisterForm) => {
    try {
      // Clear any previous errors
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
      })
      // Navigate based on user role (new users are always customers)
      navigate('/')
    } catch (error: any) {
      // Set form error for immediate feedback
      setError('email', { message: error.message || 'Error al crear la cuenta' })
      console.error('Register error:', error)
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
            ¡Únete a Central Pets!
          </h2>
          <p className="text-gray-600">
            Crea tu cuenta y comienza a cuidar mejor a tu mascota
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-medium text-pet-coral-600 hover:text-pet-coral-500"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Error Message */}
        {error && !isLoading && (
          <Card className="bg-red-50 border-2 border-red-200">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </Card>
        )}
        
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-pet-pink-200">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Nombre Completo"
              type="text"
              icon={<User className="h-4 w-4 text-gray-400" />}
              error={errors.name?.message}
              className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres'
                }
              })}
            />

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

            <Input
              label="Teléfono"
              type="tel"
              icon={<Phone className="h-4 w-4 text-gray-400" />}
              error={errors.phone?.message}
              className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
              {...register('phone', {
                required: 'El teléfono es requerido'
              })}
            />

            <Input
              label="Dirección"
              type="text"
              icon={<MapPin className="h-4 w-4 text-gray-400" />}
              error={errors.address?.message}
              className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
              {...register('address', {
                required: 'La dirección es requerida'
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

            <div className="relative">
              <Input
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                icon={<Lock className="h-4 w-4 text-gray-400" />}
                error={errors.confirmPassword?.message}
                className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
                {...register('confirmPassword', {
                  required: 'Confirma tu contraseña',
                  validate: (value) => value === password || 'Las contraseñas no coinciden'
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                className="h-4 w-4 text-pet-coral-600 focus:ring-pet-coral-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-900">
                Acepto los{' '}
                <Link to="/terms" className="text-pet-coral-600 hover:text-pet-coral-500">
                  términos y condiciones
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
              size="lg"
            >
              {isLoading ? 'Creando cuenta...' : 'Crear Cuenta 🎉'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}