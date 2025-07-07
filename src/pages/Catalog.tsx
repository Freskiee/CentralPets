import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Product } from '../types'
import { ProductCard } from '../components/ProductCard'
import { Button } from '../components/UI/Button'
import { Input } from '../components/UI/Input'
import { Card } from '../components/UI/Card'

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Croquetas Premium para Perros',
    description: 'Alimento balanceado con ingredientes naturales para perros adultos.',
    price: 45.99,
    category_id: 'alimentos',
    image_url: '/assets/CentralPets_img/perro.avif',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z',
    species: 'perros'
  },
  {
    id: '2',
    name: 'Collar Decorativo para Gatos',
    description: 'Hermoso collar con campanita para gatos de todas las edades.',
    price: 12.99,
    category_id: 'accesorios',
    image_url: '/assets/CentralPets_img/gatos.avif',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z',
    species: 'gatos'
  },
  {
    id: '3',
    name: 'Cama Ortopédica para Perros',
    description: 'Cama ergonómica con memoria de forma para el descanso óptimo.',
    price: 89.99,
    category_id: 'mobiliario',
    image_url: '/assets/CentralPets_img/perro.avif',
    stock: 8,
    created_at: '2024-01-01T00:00:00Z',
    species: 'perros'
  },
  {
    id: '4',
    name: 'Juguete Interactivo para Gatos',
    description: 'Juguete estimulante que mantiene a tu gato activo y entretenido.',
    price: 19.99,
    category_id: 'juguetes',
    image_url: '/assets/CentralPets_img/gato.avif',
    stock: 20,
    created_at: '2024-01-01T00:00:00Z',
    species: 'gatos'
  },
  {
    id: '5',
    name: 'Shampoo Hipoalergénico para Conejos',
    description: 'Shampoo especial para pieles sensibles con ingredientes naturales.',
    price: 15.99,
    category_id: 'higiene',
    image_url: '/assets/CentralPets_img/conejos.avif',
    stock: 30,
    created_at: '2024-01-01T00:00:00Z',
    species: 'conejos'
  },
  {
    id: '6',
    name: 'Transportadora de Lujo para Perros',
    description: 'Transportadora premium con diseño elegante y máxima comodidad.',
    price: 125.99,
    category_id: 'mobiliario',
    image_url: '/assets/CentralPets_img/perro.avif',
    stock: 5,
    created_at: '2024-01-01T00:00:00Z',
    species: 'perros'
  },
  {
    id: '7',
    name: 'Semillas Premium para Aves',
    description: 'Mezcla nutritiva de semillas para canarios y periquitos.',
    price: 8.99,
    category_id: 'alimentos',
    image_url: '/assets/CentralPets_img/pajaro.avif',
    stock: 40,
    created_at: '2024-01-01T00:00:00Z',
    species: 'aves'
  },
  {
    id: '8',
    name: 'Acuario Completo para Peces',
    description: 'Kit completo con filtro, iluminación LED y decoración.',
    price: 199.99,
    category_id: 'mobiliario',
    image_url: '/assets/CentralPets_img/peces.avif',
    stock: 12,
    created_at: '2024-01-01T00:00:00Z',
    species: 'peces'
  },
  {
    id: '9',
    name: 'Terrario para Reptiles',
    description: 'Terrario de vidrio con ventilación y sistema de calefacción.',
    price: 299.99,
    category_id: 'mobiliario',
    image_url: '/assets/CentralPets_img/camaleon.avif',
    stock: 6,
    created_at: '2024-01-01T00:00:00Z',
    species: 'reptiles'
  },
  {
    id: '10',
    name: 'Rueda de Ejercicio para Hámsters',
    description: 'Rueda silenciosa de alta calidad para hámsters y otros roedores.',
    price: 24.99,
    category_id: 'juguetes',
    image_url: '/assets/CentralPets_img/hamster.avif',
    stock: 18,
    created_at: '2024-01-01T00:00:00Z',
    species: 'otros'
  }
]

const categories = [
  { id: 'all', name: 'Todos los productos', icon: '🛍️' },
  { id: 'alimentos', name: 'Alimentos', icon: '🍖' },
  { id: 'accesorios', name: 'Accesorios', icon: '🎀' },
  { id: 'mobiliario', name: 'Mobiliario', icon: '🏠' },
  { id: 'juguetes', name: 'Juguetes', icon: '🎾' },
  { id: 'higiene', name: 'Higiene', icon: '🧼' },
  { id: 'fancy-pets', name: 'Fancy-Pets', icon: '⭐' }
]

const species = [
  { id: 'all', name: 'Todas las especies', icon: '🐾' },
  { id: 'perros', name: 'Perros', icon: '🐕' },
  { id: 'gatos', name: 'Gatos', icon: '🐱' },
  { id: 'conejos', name: 'Conejos', icon: '🐰' },
  { id: 'aves', name: 'Aves', icon: '🐦' },
  { id: 'peces', name: 'Peces', icon: '🐠' },
  { id: 'reptiles', name: 'Reptiles', icon: '🦎' },
  { id: 'otros', name: 'Otros', icon: '🐹' }
]

export const Catalog: React.FC = () => {
  const location = useLocation()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSpecies, setSelectedSpecies] = useState('all')
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 })
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Get species from URL if we're on a species page
  useEffect(() => {
    const pathParts = location.pathname.split('/')
    if (pathParts[1] === 'especies' && pathParts[2]) {
      setSelectedSpecies(pathParts[2])
    }
  }, [location.pathname])

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setIsLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category_id === selectedCategory)
    }

    // Filter by species
    if (selectedSpecies !== 'all') {
      filtered = filtered.filter(product => (product as any).species === selectedSpecies)
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, selectedSpecies, priceRange, sortBy])

  // Get current species info for display
  const currentSpecies = species.find(s => s.id === selectedSpecies)
  const isSpeciesPage = location.pathname.includes('/especies/')

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gradient-to-r from-pet-pink-200 to-pet-blue-200 rounded w-64 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-pet-pink-100 to-pet-blue-100 rounded-2xl h-80"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {isSpeciesPage && currentSpecies ? (
            <>
              {currentSpecies.icon} Productos para {currentSpecies.name}
            </>
          ) : (
            '🛍️ Catálogo de Productos'
          )}
        </h1>
        <p className="text-xl text-gray-600">
          {isSpeciesPage && currentSpecies ? (
            `Encuentra los mejores productos especializados para ${currentSpecies.name.toLowerCase()}`
          ) : (
            'Descubre nuestra amplia selección de productos para todas las mascotas'
          )}
        </p>
      </div>

      {/* Search and Quick Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="🔍 Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-full border-2 border-pet-pink-200 focus:border-pet-coral-400"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filtros
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Enhanced Filters Sidebar */}
        <div className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="filter-section p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-6 w-6 text-pet-coral-500" />
              <h3 className="text-xl font-bold text-gray-900">Filtros</h3>
            </div>
            
            {/* Species Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🐾 Especies
              </label>
              <div className="grid grid-cols-2 gap-2">
                {species.map(spec => (
                  <button
                    key={spec.id}
                    onClick={() => setSelectedSpecies(spec.id)}
                    className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      selectedSpecies === spec.id
                        ? 'bg-gradient-to-r from-pet-coral-500 to-pet-pink-500 text-white shadow-lg'
                        : 'bg-white border-2 border-pet-pink-200 text-gray-700 hover:border-pet-coral-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{spec.icon}</div>
                    <div className="text-xs">{spec.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                📦 Categorías
              </label>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-3 rounded-xl text-left font-medium transition-all duration-300 flex items-center space-x-3 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-pet-blue-500 to-pet-mint-500 text-white shadow-lg'
                        : 'bg-white border-2 border-pet-blue-200 text-gray-700 hover:border-pet-blue-300'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3">
                💰 Rango de Precio
              </label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border-2 border-pet-yellow-200 rounded-xl focus:outline-none focus:border-pet-yellow-400"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border-2 border-pet-yellow-200 rounded-xl focus:outline-none focus:border-pet-yellow-400"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full h-2 bg-pet-yellow-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                🔄 Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-pet-purple-200 rounded-xl focus:outline-none focus:border-pet-purple-400 bg-white font-medium"
              >
                <option value="name">Nombre A-Z</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600 font-medium">
              🎯 {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              {isSpeciesPage && currentSpecies && (
                <span className="text-pet-coral-600 font-bold"> para {currentSpecies.name.toLowerCase()}</span>
              )}
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <Card className="text-center py-12 bg-gradient-to-br from-pet-pink-50 to-pet-blue-50 border-2 border-pet-pink-200">
              <div className="text-6xl mb-4">😿</div>
              <p className="text-gray-500 text-xl font-medium">
                No se encontraron productos que coincidan con los filtros.
              </p>
              <Button 
                className="mt-4" 
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedSpecies('all')
                  setSearchTerm('')
                  setPriceRange({ min: 0, max: 1000 })
                }}
              >
                Limpiar Filtros
              </Button>
            </Card>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}