import React, { useState } from 'react'
import { 
  Users, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Badge } from '../components/UI/Badge'
import { formatPrice, formatDate } from '../lib/utils'
import { useAuthStore } from '../store/auth'

// Mock data
const mockStats = {
  totalUsers: 1250,
  totalProducts: 89,
  totalOrders: 456,
  totalRevenue: 45678.90,
  monthlyGrowth: 12.5
}

const mockRecentOrders = [
  {
    id: '1',
    user: 'María González',
    total: 67.98,
    status: 'delivered',
    date: '2024-01-15T10:30:00Z',
    items: 2
  },
  {
    id: '2',
    user: 'Carlos Rodríguez',
    total: 125.99,
    status: 'processing',
    date: '2024-01-14T14:20:00Z',
    items: 1
  },
  {
    id: '3',
    user: 'Ana Martínez',
    total: 89.99,
    status: 'shipped',
    date: '2024-01-13T16:45:00Z',
    items: 1
  }
]

const mockProducts = [
  {
    id: '1',
    name: 'Croquetas Premium para Perros',
    price: 45.99,
    stock: 25,
    category: 'Alimentos',
    species: 'Perros',
    sales: 156
  },
  {
    id: '2',
    name: 'Collar Decorativo para Gatos',
    price: 12.99,
    stock: 15,
    category: 'Accesorios',
    species: 'Gatos',
    sales: 89
  },
  {
    id: '3',
    name: 'Cama Ortopédica para Perros',
    price: 89.99,
    stock: 8,
    category: 'Mobiliario',
    species: 'Perros',
    sales: 67
  }
]

const mockUsers = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@example.com',
    role: 'customer',
    orders: 5,
    totalSpent: 234.56,
    joinDate: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    role: 'customer',
    orders: 3,
    totalSpent: 156.78,
    joinDate: '2024-01-05T00:00:00Z'
  }
]

export const Admin: React.FC = () => {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard')
  const [searchTerm, setSearchTerm] = useState('')

  // Check if user is admin
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🔐</div>
          <p className="text-gray-500 text-xl">Debes iniciar sesión para acceder al panel de administración</p>
          <Button className="mt-4">
            <Link to="/login">Iniciar Sesión</Link>
          </Button>
        </Card>
      </div>
    )
  }

  if (user.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">🚫</div>
          <p className="text-gray-500 text-xl">No tienes permisos para acceder a esta sección</p>
          <p className="text-gray-400 mt-2">Solo los administradores pueden ver el panel de administración</p>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Volver Atrás
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🛠️ Panel de Administración
        </h1>
        <p className="text-xl text-gray-600">
          Gestiona tu tienda Central Pets desde aquí
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex-1 min-w-max py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'dashboard'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="h-5 w-5 inline mr-2" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 min-w-max py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'products'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Package className="h-5 w-5 inline mr-2" />
          Productos
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 min-w-max py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'orders'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ShoppingBag className="h-5 w-5 inline mr-2" />
          Pedidos
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 min-w-max py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'users'
              ? 'bg-white text-pet-coral-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="h-5 w-5 inline mr-2" />
          Usuarios
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-pet-coral-50 to-pet-pink-50 border-2 border-pet-coral-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                  <p className="text-3xl font-bold text-pet-coral-600">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-12 w-12 text-pet-coral-500" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pet-blue-50 to-pet-mint-50 border-2 border-pet-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Productos</p>
                  <p className="text-3xl font-bold text-pet-blue-600">{mockStats.totalProducts}</p>
                </div>
                <Package className="h-12 w-12 text-pet-blue-500" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pet-mint-50 to-pet-yellow-50 border-2 border-pet-mint-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
                  <p className="text-3xl font-bold text-pet-mint-600">{mockStats.totalOrders}</p>
                </div>
                <ShoppingBag className="h-12 w-12 text-pet-mint-500" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pet-yellow-50 to-pet-coral-50 border-2 border-pet-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
                  <p className="text-3xl font-bold text-pet-yellow-600">{formatPrice(mockStats.totalRevenue)}</p>
                </div>
                <DollarSign className="h-12 w-12 text-pet-yellow-500" />
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pedidos Recientes</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">#{order.id}</td>
                      <td className="py-3 px-4">{order.user}</td>
                      <td className="py-3 px-4 font-bold text-pet-coral-600">{formatPrice(order.total)}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            order.status === 'delivered' ? 'success' :
                            order.status === 'processing' ? 'warning' :
                            order.status === 'shipped' ? 'secondary' : 'primary'
                          }
                        >
                          {order.status === 'delivered' ? 'Entregado' :
                           order.status === 'processing' ? 'Procesando' :
                           order.status === 'shipped' ? 'Enviado' : 'Pendiente'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(order.date)}</td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Producto
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="🔍 Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-pet-pink-200 focus:border-pet-coral-400"
              />
            </div>
            <Button variant="ghost">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Producto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Precio</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Categoría</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Especie</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Ventas</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4 font-bold text-pet-coral-600">{formatPrice(product.price)}</td>
                      <td className="py-3 px-4">
                        <Badge variant={product.stock < 10 ? 'warning' : 'success'}>
                          {product.stock} unidades
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">{product.species}</td>
                      <td className="py-3 px-4 text-gray-600">{product.sales} ventas</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h2>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Items</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockRecentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">#{order.id}</td>
                      <td className="py-3 px-4">{order.user}</td>
                      <td className="py-3 px-4 font-bold text-pet-coral-600">{formatPrice(order.total)}</td>
                      <td className="py-3 px-4">{order.items} items</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            order.status === 'delivered' ? 'success' :
                            order.status === 'processing' ? 'warning' :
                            order.status === 'shipped' ? 'secondary' : 'primary'
                          }
                        >
                          {order.status === 'delivered' ? 'Entregado' :
                           order.status === 'processing' ? 'Procesando' :
                           order.status === 'shipped' ? 'Enviado' : 'Pendiente'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(order.date)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Usuario</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Rol</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Pedidos</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Total Gastado</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Registro</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <Badge variant={user.role === 'admin' ? 'danger' : 'primary'}>
                          {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{user.orders}</td>
                      <td className="py-3 px-4 font-bold text-pet-coral-600">{formatPrice(user.totalSpent)}</td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(user.joinDate)}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}