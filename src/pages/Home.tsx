import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Star, ShoppingBag, Users, Award, Heart } from 'lucide-react'
import { Product } from '../types'
import { ProductCard } from '../components/ProductCard'
import { Button } from '../components/UI/Button'
import { Card } from '../components/UI/Card'

// Mock data - replace with actual API calls
const mockFeaturedProducts: Product[] = [
  {
    id: '1',
    name: 'Croquetas Premium para Perros',
    description: 'Alimento balanceado con ingredientes naturales para perros adultos.',
    price: 45.99,
    category_id: 'alimentos',
    image_url: '/assets/CentralPets_img/perro.avif',
    stock: 25,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Collar Decorativo para Gatos',
    description: 'Hermoso collar con campanita para gatos de todas las edades.',
    price: 12.99,
    category_id: 'accesorios',
    image_url: '/assets/CentralPets_img/gato.avif',
    stock: 15,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Cama Ortopédica para Perros',
    description: 'Cama ergonómica con memoria de forma para el descanso óptimo.',
    price: 89.99,
    category_id: 'mobiliario',
    image_url: '/assets/CentralPets_img/perro.avif',
    stock: 8,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Juguete Interactivo para Gatos',
    description: 'Juguete estimulante que mantiene a tu gato activo y entretenido.',
    price: 19.99,
    category_id: 'juguetes',
    image_url: 'https://images.pexels.com/photos/7516028/pexels-photo-7516028.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop',
    stock: 20,
    created_at: '2024-01-01T00:00:00Z'
  }
]

const happyClients = [
  {
    id: 1,
    name: 'María González',
    petName: 'Luna',
    petType: '🐱',
    image: '/assets/CentralPets_img/gato.avif',
    testimonial: 'Luna ama su nueva cama ortopédica. ¡Duerme como una princesa!'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    petName: 'Max',
    petType: '🐕',
    image: '/assets/CentralPets_img/perro.avif',
    testimonial: 'Las croquetas premium han mejorado mucho la salud de Max.'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    petName: 'Coco',
    petType: '🐰',
    image: '/assets/CentralPets_img/conejos.avif',
    testimonial: 'Coco está feliz con su nueva casa. ¡Excelente calidad!'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    petName: 'Kiwi',
    petType: '🐦',
    image: '/assets/CentralPets_img/pajaro.avif',
    testimonial: 'Kiwi canta más feliz desde que tiene sus nuevos juguetes.'
  }
]

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedProducts(mockFeaturedProducts)
    }, 500)
  }, [])

  const handleSpeciesClick = (species: string) => {
    navigate(`/especies/${species}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pet-pink-200 via-pet-blue-200 to-pet-mint-200 text-gray-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
  <Link to="/">
    <img
      src="/assets/logo.png"
      alt="Central Pets Logo"
      className="h-32 md:h-56 w-auto object-contain mx-auto drop-shadow-lg animate-bounce-slow"
    />
  </Link>
</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pet-coral-600 to-pet-pink-600 bg-clip-text text-transparent">
              ¡Bienvenido a Central Pets!
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-4xl mx-auto text-gray-700 font-medium">
              Tu tienda de confianza para accesorios de mascotas. Calidad, amor y dedicación para 
              <span className="font-bold text-pet-coral-600"> TODAS las especies</span>: 
              🐕 🐱 🐰 🐦 🐠 🦎 y más.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="primary" className="text-lg">
                <Link to="/catalog" className="flex items-center space-x-2">
                  <ShoppingBag className="h-6 w-6" />
                  <span>Explorar Tienda</span>
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="text-lg">
                <Link to="/clientes-felices">Ver Clientes Felices <img src="/assets/logo.png" alt="Central Pets Logo" className="inline w-14 h-14 align-middle" /></Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Species Section */}
      <section className="py-16 bg-gradient-to-r from-pet-yellow-50 to-pet-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Compra por Especies <img src="/assets/logo.png" alt="Central Pets Logo" className="inline w-10 h-10 align-middle" />
          </h2>
          <p className="text-lg md:text-xl text-center mb-12 text-gray-600">
            Productos especializados para cada tipo de mascota
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {[
              { name: 'Perros', icon: '🐕', color: 'from-pet-coral-400 to-pet-pink-400', link: 'perros' },
              { name: 'Gatos', icon: '🐱', color: 'from-pet-purple-400 to-pet-pink-400', link: 'gatos' },
              { name: 'Conejos', icon: '🐰', color: 'from-pet-mint-400 to-pet-blue-400', link: 'conejos' },
              { name: 'Aves', icon: '🐦', color: 'from-pet-blue-400 to-pet-mint-400', link: 'aves' },
              { name: 'Peces', icon: '🐠', color: 'from-pet-blue-400 to-pet-purple-400', link: 'peces' },
              { name: 'Reptiles', icon: '🦎', color: 'from-pet-mint-400 to-pet-yellow-400', link: 'reptiles' },
              { name: 'Otros', icon: '🐹', color: 'from-pet-yellow-400 to-pet-coral-400', link: 'otros' }
            ].map((species) => (
              <button
                key={species.name}
                onClick={() => handleSpeciesClick(species.link)}
                className="species-card bg-white rounded-2xl p-4 md:p-6 text-center shadow-lg group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${species.color} flex items-center justify-center mx-auto mb-3 group-hover:animate-wiggle`}>
                  <span className="text-2xl md:text-3xl">{species.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm md:text-lg">{species.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué elegir Central Pets? 💝
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 md:p-8 bg-gradient-to-br from-pet-coral-50 to-pet-pink-50 border-2 border-pet-coral-200">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-pet-coral-400 to-pet-pink-400 p-4 rounded-full">
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Calidad Garantizada</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Productos de las mejores marcas con garantía de calidad para el bienestar de tu mascota.
              </p>
            </Card>
            
            <Card className="text-center p-6 md:p-8 bg-gradient-to-br from-pet-blue-50 to-pet-mint-50 border-2 border-pet-blue-200">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-pet-blue-400 to-pet-mint-400 p-4 rounded-full">
                  <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Atención Personalizada</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Nuestro equipo de expertos te ayudará a encontrar lo mejor para tu mascota.
              </p>
            </Card>
            
            <Card className="text-center p-6 md:p-8 bg-gradient-to-br from-pet-mint-50 to-pet-yellow-50 border-2 border-pet-mint-200">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-pet-mint-400 to-pet-yellow-400 p-4 rounded-full">
                  <Star className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">Satisfacción Total</h3>
              <p className="text-gray-600 text-base md:text-lg">
                Miles de clientes satisfechos respaldan la calidad de nuestros productos y servicio.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Happy Clients Section */}
      <section className="py-16 bg-gradient-to-br from-pet-purple-50 to-pet-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Clientes Felices <span className="inline">😊</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Mira lo felices que están nuestros clientes y sus mascotas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {happyClients.map((client) => (
              <Card key={client.id} className="text-center p-6 bg-white border-2 border-pet-pink-200 hover:border-pet-coral-300 transition-all duration-300 hover:shadow-xl">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-pet-pink-200"
                />
                <div className="text-3xl mb-2">{client.petType}</div>
                <h3 className="text-lg font-bold text-gray-900">{client.name}</h3>
                <p className="text-pet-coral-600 font-medium mb-3">y {client.petName}</p>
                <p className="text-gray-600 text-sm italic">"{client.testimonial}"</p>
                <div className="flex justify-center mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-pet-yellow-400 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="pet-special">
  <Link to="/clientes-felices">
    Ver Más Historias Felices 🌟
  </Link>
</Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Productos Destacados ⭐
            </h2>
            <p className="text-lg md:text-xl text-gray-600">
              Descubre nuestros productos más populares y mejor valorados
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="primary">
              <Link to="/catalog">
                Ver Todos los Productos 🛍️
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}