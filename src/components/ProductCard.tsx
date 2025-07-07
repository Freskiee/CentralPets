import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { Product } from '../types'
import { Button } from './UI/Button'
import { Badge } from './UI/Badge'
import { formatPrice } from '../lib/utils'
import { useCartStore } from '../store/cart'
import { useLikesStore } from '../store/likes'
import { useAuthStore } from '../store/auth'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore()
  const { addLike, removeLike, isLiked } = useLikesStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 300))
    
    addItem(product, quantity)
    
    setIsAdding(false)
    
    // Show success feedback
    const button = e.currentTarget as HTMLButtonElement
    const originalText = button.textContent
    button.textContent = '¡Agregado! ✓'
    button.style.background = 'linear-gradient(to right, #10b981, #059669)'
    
    setTimeout(() => {
      button.textContent = originalText
      button.style.background = ''
      // Reset quantity after showing success message
      setQuantity(1)
    }, 1500)
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    if (isLiked(product.id)) {
      removeLike(product.id)
    } else {
      addLike(product.id)
    }
  }

  return (
    <div className="pet-card rounded-2xl overflow-hidden group relative">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={(() => {
              if (product.species === 'perros' || product.category_id === 'perros') return '/assets/CentralPets_img/perro.avif';
              if (product.species === 'gatos' || product.category_id === 'gatos') return '/assets/CentralPets_img/gato.avif';
              if (product.species === 'peces' || product.category_id === 'peces') return '/assets/CentralPets_img/peces.avif';
              if (product.species === 'aves' || product.category_id === 'aves') return '/assets/CentralPets_img/pajaro.avif';
              if (product.species === 'conejos' || product.category_id === 'conejos') return '/assets/CentralPets_img/conejos.avif';
              if (product.species === 'reptiles' || product.category_id === 'reptiles') return '/assets/CentralPets_img/camaleon.avif';
              if (product.species === 'otros' || product.category_id === 'otros') return '/assets/CentralPets_img/hamster.avif';
              return '/assets/CentralPets_img/petshop.avif';
            })()}
            alt={product.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3">
            <button 
              onClick={handleLikeClick}
              className={`p-2 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                isLiked(product.id) 
                  ? 'bg-pet-pink-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-pet-pink-100 hover:text-pet-pink-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked(product.id) ? 'fill-current' : ''}`} />
            </button>
          </div>
          {product.stock < 5 && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning" className="animate-pulse">
                ⚡ Últimas unidades
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < 4 ? 'text-pet-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-xs font-medium text-gray-600 ml-1">4.8</span>
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-pet-coral-500 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-pet-coral-500 to-pet-pink-500 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="px-2 py-1 border border-pet-pink-200 rounded-lg text-sm focus:outline-none focus:border-pet-coral-400"
              onClick={(e) => e.stopPropagation()}
            >
              {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className="flex items-center space-x-2 bg-gradient-to-r from-pet-coral-500 to-pet-pink-500 hover:from-pet-coral-600 hover:to-pet-pink-600 transform hover:scale-105 transition-all duration-300"
              size="sm"
              isLoading={isAdding}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{isAdding ? 'Agregando...' : 'Agregar'}</span>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            📦 Stock: {product.stock} unidades
          </span>
          <span className="text-pet-mint-600 font-medium">
            🚚 Envío gratis
          </span>
        </div>
      </div>
    </div>
  )
}