import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Heart, Star, Minus, Plus } from 'lucide-react'
import { Product } from '../types'
import { Button } from '../components/UI/Button'
import { Card } from '../components/UI/Card'
import { Badge } from '../components/UI/Badge'
import { formatPrice } from '../lib/utils'
import { useCartStore } from '../store/cart'

// Mock data
const mockProduct: Product = {
  id: '1',
  name: 'Croquetas Premium para Perros',
  description: 'Alimento balanceado con ingredientes naturales para perros adultos. Formulado con pollo real, arroz integral y verduras frescas. Rico en proteínas y vitaminas esenciales para mantener a tu mascota saludable y activa.',
  price: 45.99,
  category_id: 'alimentos',
  image_url: 'https://images.pexels.com/photos/7516011/pexels-photo-7516011.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  stock: 25,
  created_at: '2024-01-01T00:00:00Z'
}

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct)
      setIsLoading(false)
    }, 500)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      // Show success message or navigate to cart
    }
  }

  const handleBuyNow = () => {
    if (product) {
      addItem(product, quantity)
      navigate('/cart')
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-lg h-96"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <p className="text-gray-500 text-lg">Producto no encontrado</p>
          <Button className="mt-4" onClick={() => navigate('/catalog')}>
            Volver al Catálogo
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Volver</span>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
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
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
            />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors">
              <Heart className="h-6 w-6 text-gray-600 hover:text-red-500" />
            </button>
          </div>
          
          {/* Additional Images */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={product.image_url}
                alt={`${product.name} ${i + 1}`}
                className="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reseñas)</span>
            </div>
            <div className="text-3xl font-bold text-orange-500 mb-4">
              {formatPrice(product.price)}
            </div>
            {product.stock < 10 && (
              <Badge variant="warning" className="mb-4">
                Solo quedan {product.stock} unidades
              </Badge>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Ingredientes naturales seleccionados</li>
              <li>• Rico en proteínas y vitaminas</li>
              <li>• Sin colorantes artificiales</li>
              <li>• Apto para perros adultos</li>
            </ul>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cantidad
              </label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Agregar al Carrito</span>
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                variant="secondary"
                className="flex-1"
              >
                Comprar Ahora
              </Button>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Información de Envío</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🚚 Envío gratis en compras mayores a $50</p>
              <p>📦 Entrega en 2-3 días hábiles</p>
              <p>↩️ Devoluciones gratuitas en 30 días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}