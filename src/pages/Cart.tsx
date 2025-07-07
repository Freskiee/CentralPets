import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cart'
import { Button } from '../components/UI/Button'
import { Card } from '../components/UI/Card'
import { formatPrice } from '../lib/utils'

export const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-6">¡Agrega algunos productos increíbles para tu mascota!</p>
          <Button asChild>
            <Link to="/catalog">Explorar Productos</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center space-x-4">
              <img
                src={item.product.image_url}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.product.name}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.product.description}
                </p>
                <div className="text-lg font-bold text-orange-500 mt-1">
                  {formatPrice(item.product.price)}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-lg font-bold text-gray-900">
                {formatPrice(item.product.price * item.quantity)}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.product_id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumen del Pedido
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({getTotalItems()} artículo{getTotalItems() !== 1 ? 's' : ''})
                </span>
                <span className="font-semibold">{formatPrice(getTotalPrice())}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-semibold text-green-600">
                  {getTotalPrice() > 50 ? 'Gratis' : formatPrice(8.99)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos</span>
                <span className="font-semibold">{formatPrice(getTotalPrice() * 0.08)}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">
                    {formatPrice(getTotalPrice() + (getTotalPrice() > 50 ? 0 : 8.99) + (getTotalPrice() * 0.08))}
                  </span>
                </div>
              </div>
            </div>
            
            <Button
              className="w-full mt-6"
              onClick={() => navigate('/checkout')}
            >
              Proceder al Pago
            </Button>
            
            <Button
              variant="ghost"
              className="w-full mt-2"
              asChild
            >
              <Link to="/catalog">Seguir Comprando</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}