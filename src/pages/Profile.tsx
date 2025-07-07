import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { User, Mail, Phone, MapPin, ShoppingBag, Calendar, DollarSign, Heart, Settings, Package } from 'lucide-react'
import { useAuthStore } from '../store/auth'
import { useLikesStore } from '../store/likes'
import { useCartStore } from '../store/cart'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Card } from '../components/UI/Card'
import { Badge } from '../components/UI/Badge'
import { formatPrice, formatDate } from '../lib/utils'

interface ProfileForm {
  name: string
  email: string
  phone: string
  address: string
}

// Mock data for orders
const mockOrders = [
  {
    id: '1',
    total_amount: 67.98,
    status: 'delivered' as const,
    created_at: '2024-01-15T10:30:00Z',
    items: [
      { product: { name: 'Croquetas Premium', price: 45.99 }, quantity: 1 },
      { product: { name: 'Juguete Interactivo', price: 19.99 }, quantity: 1 }
    ]
  },
  {
    id: '2',
    total_amount: 125.99,
    status: 'processing' as const,
    created_at: '2024-01-10T14:20:00Z',
    items: [
      { product: { name: 'Transportadora de Lujo', price: 125.99 }, quantity: 1 }
    ]
  },
  {
    id: '3',
    total_amount: 89.99,
    status: 'shipped' as const,
    created_at: '2024-01-08T16:45:00Z',
    items: [
      { product: { name: 'Cama Ortopédica', price: 89.99 }, quantity: 1 }
    ]
  }
]

export const Profile: React.FC = () => {
  const { user, setUser } = useAuthStore()
  const { getLikedCount } = useLikesStore()
  const { getTotalItems } = useCartStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'likes'>('profile')
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    }
  })

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (user) {
        setUser({ ...user, ...data })
      }
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-gray-500 text-xl">Debes iniciar sesión para ver tu perfil</p>
          <Button className="mt-4">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const totalOrders = mockOrders.length
  const totalSpent = mockOrders.reduce((sum, order) => sum + order.total_amount, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-pet-coral-400 to-pet-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          ¡Hola, {user.name}! 👋
        </h1>
        <p className="text-xl text-gray-600">
          Bienvenido a tu perfil de Central Pets
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="text-center p-6 bg-gradient-to-br from-pet-coral-50 to-pet-pink-50 border-2 border-pet-coral-200">
          <ShoppingBag className="h-8 w-8 text-pet-coral-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-pet-coral-600">{totalOrders}</div>
          <div className="text-gray-600 font-medium">Pedidos</div>
        </Card>
        
        <Card className="text-center p-6 bg-gradient-to-br from-pet-blue-50 to-pet-mint-50 border-2 border-pet-blue-200">
          <DollarSign className="h-8 w-8 text-pet-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-pet-blue-600">{formatPrice(totalSpent)}</div>
          <div className="text-gray-600 font-medium">Total Gastado</div>
        </Card>
        
        <Card className="text-center p-6 bg-gradient-to-br from-pet-pink-50 to-pet-purple-50 border-2 border-pet-pink-200">
          <Heart className="h-8 w-8 text-pet-pink-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-pet-pink-600">{getLikedCount()}</div>
          <div className="text-gray-600 font-medium">Productos Favoritos</div>
        </Card>
        
        <Card className="text-center p-6 bg-gradient-to-br from-pet-yellow-50 to-pet-coral-50 border-2 border-pet-yellow-200">
          <Package className="h-8 w-8 text-pet-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-pet-yellow-600">{getTotalItems()}</div>
          <div className="text-gray-600 font-medium">En Carrito</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'profile'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="h-5 w-5 inline mr-2" />
          Mi Perfil
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'orders'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ShoppingBag className="h-5 w-5 inline mr-2" />
          Mis Pedidos
        </button>
        <button
          onClick={() => setActiveTab('likes')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'likes'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Heart className="h-5 w-5 inline mr-2" />
          Favoritos
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-pet-coral-500" />
              Información Personal
            </h2>
            <Button
              variant="ghost"
              onClick={() => {
                setIsEditing(!isEditing)
                if (!isEditing) {
                  reset({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                  })
                }
              }}
            >
              {isEditing ? 'Cancelar' : 'Editar'}
            </Button>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nombre Completo"
                  type="text"
                  icon={<User className="h-4 w-4 text-gray-400" />}
                  error={errors.name?.message}
                  className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
                  {...register('name', { required: 'El nombre es requerido' })}
                />
                
                <Input
                  label="Email"
                  type="email"
                  icon={<Mail className="h-4 w-4 text-gray-400" />}
                  error={errors.email?.message}
                  className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
                  {...register('email', { required: 'El email es requerido' })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Teléfono"
                  type="tel"
                  icon={<Phone className="h-4 w-4 text-gray-400" />}
                  error={errors.phone?.message}
                  className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
                  {...register('phone', { required: 'El teléfono es requerido' })}
                />
                
                <Input
                  label="Dirección"
                  type="text"
                  icon={<MapPin className="h-4 w-4 text-gray-400" />}
                  error={errors.address?.message}
                  className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
                  {...register('address', { required: 'La dirección es requerida' })}
                />
              </div>
              
              <div className="flex space-x-4">
                <Button type="submit" isLoading={isLoading}>
                  Guardar Cambios
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pet-coral-50 to-pet-pink-50 rounded-xl">
                  <User className="h-6 w-6 text-pet-coral-500" />
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-bold text-lg">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pet-blue-50 to-pet-mint-50 rounded-xl">
                  <Mail className="h-6 w-6 text-pet-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold text-lg">{user.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pet-mint-50 to-pet-yellow-50 rounded-xl">
                  <Phone className="h-6 w-6 text-pet-mint-500" />
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-bold text-lg">{user.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-pet-purple-50 to-pet-pink-50 rounded-xl">
                  <MapPin className="h-6 w-6 text-pet-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Dirección</p>
                    <p className="font-bold text-lg">{user.address}</p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex items-center space-x-3 p-4 bg-gradient-to-r from-pet-yellow-50 to-pet-coral-50 rounded-xl">
                <Calendar className="h-6 w-6 text-pet-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Miembro desde</p>
                  <p className="font-bold text-lg">{formatDate(user.created_at)}</p>
                </div>
              </div>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'orders' && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2 text-pet-coral-500" />
            Historial de Pedidos
          </h2>
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="border-2 border-pet-pink-200 rounded-xl p-6 hover:border-pet-coral-300 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Pedido #{order.id}</h3>
                    <p className="text-gray-600">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        order.status === 'delivered' ? 'success' :
                        order.status === 'processing' ? 'warning' :
                        order.status === 'shipped' ? 'secondary' : 'primary'
                      }
                    >
                      {order.status === 'delivered' ? '✅ Entregado' :
                       order.status === 'processing' ? '⏳ Procesando' :
                       order.status === 'shipped' ? '🚚 Enviado' : '📦 Pendiente'}
                    </Badge>
                    <p className="text-xl font-bold text-pet-coral-600 mt-1">
                      {formatPrice(order.total_amount)}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.product.name} x{item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'likes' && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pet-pink-500" />
            Productos Favoritos ({getLikedCount()})
          </h2>
          {getLikedCount() === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl">No tienes productos favoritos aún</p>
              <Button className="mt-4">
                <a href="/catalog">Explorar Productos</a>
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-pet-pink-500 mx-auto mb-4" />
              <p className="text-gray-600 text-xl">Tienes {getLikedCount()} productos en favoritos</p>
              <p className="text-gray-500 mt-2">¡Próximamente podrás ver todos tus productos favoritos aquí!</p>
              <Button className="mt-4">
                <a href="/catalog">Seguir Explorando</a>
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}