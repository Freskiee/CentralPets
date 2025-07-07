import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'pet-special'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105'
  
  const variants = {
    primary: 'bg-gradient-to-r from-pet-coral-500 to-pet-pink-500 text-white hover:from-pet-coral-600 hover:to-pet-pink-600 focus:ring-pet-coral-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-pet-blue-500 to-pet-mint-500 text-white hover:from-pet-blue-600 hover:to-pet-mint-600 focus:ring-pet-blue-500 shadow-lg hover:shadow-xl',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:ring-red-500 shadow-lg hover:shadow-xl',
    ghost: 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-pet-pink-50 hover:text-pet-coral-600 focus:ring-pet-pink-500 border-2 border-pet-pink-200 hover:border-pet-coral-300',
    'pet-special': 'bg-gradient-to-r from-pet-purple-500 to-pet-pink-500 text-white hover:from-pet-purple-600 hover:to-pet-pink-600 focus:ring-pet-purple-500 shadow-lg hover:shadow-xl animate-pulse'
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}