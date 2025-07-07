import React from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'pet-special'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-pet-coral-100 to-pet-pink-100 text-pet-coral-800 border border-pet-coral-200',
    secondary: 'bg-gradient-to-r from-pet-blue-100 to-pet-mint-100 text-pet-blue-800 border border-pet-blue-200',
    success: 'bg-gradient-to-r from-pet-mint-100 to-green-100 text-pet-mint-800 border border-pet-mint-200',
    warning: 'bg-gradient-to-r from-pet-yellow-100 to-orange-100 text-pet-yellow-800 border border-pet-yellow-200',
    danger: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border border-red-200',
    'pet-special': 'bg-gradient-to-r from-pet-purple-100 to-pet-pink-100 text-pet-purple-800 border border-pet-purple-200 animate-pulse'
  }

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}