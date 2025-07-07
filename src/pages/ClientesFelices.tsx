import React from 'react'
import { Star, Heart } from 'lucide-react'
import { Card } from '../components/UI/Card'
import { Button } from '../components/UI/Button'

const happyClients = [
  {
    id: 1,
    name: 'María González',
    petName: 'Luna',
    petType: '🐱',
    petBreed: 'Gato Persa',
    image: '/assets/CentralPets_img/gato.avif',
    petImage: '/assets/CentralPets_img/gato.avif',
    testimonial: 'Luna ama su nueva cama ortopédica. ¡Duerme como una princesa! La calidad es excepcional y el diseño es hermoso.',
    product: 'Cama Ortopédica Premium',
    rating: 5,
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    petName: 'Max',
    petType: '🐕',
    petBreed: 'Golden Retriever',
    image: '/assets/CentralPets_img/perro.avif',
    petImage: '/assets/CentralPets_img/perro.avif',
    testimonial: 'Las croquetas premium han mejorado mucho la salud de Max. Su pelaje está más brillante y tiene más energía.',
    product: 'Croquetas Premium Naturales',
    rating: 5,
    date: '2024-01-10'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    petName: 'Coco',
    petType: '🐰',
    petBreed: 'Conejo Holandés',
    image: '/assets/CentralPets_img/conejos.avif',
    petImage: '/assets/CentralPets_img/conejos.avif',
    testimonial: 'Coco está feliz con su nueva casa. ¡Excelente calidad! Es espaciosa y muy cómoda para él.',
    product: 'Casa para Conejos Deluxe',
    rating: 5,
    date: '2024-01-08'
  },
  {
    id: 4,
    name: 'Luis Fernández',
    petName: 'Kiwi',
    petType: '🐦',
    petBreed: 'Canario',
    image: '/assets/CentralPets_img/pajaro.avif',
    petImage: '/assets/CentralPets_img/pajaro.avif',
    testimonial: 'Kiwi canta más feliz desde que tiene sus nuevos juguetes. Los colores son vibrantes y muy seguros.',
    product: 'Set de Juguetes para Aves',
    rating: 5,
    date: '2024-01-05'
  },
  {
    id: 5,
    name: 'Sofia Herrera',
    petName: 'Nemo',
    petType: '🐠',
    petBreed: 'Pez Betta',
    image: '/assets/CentralPets_img/peces.avif',
    petImage: '/assets/CentralPets_img/peces.avif',
    testimonial: 'El acuario que compré es perfecto para Nemo. El sistema de filtración es excelente y muy silencioso.',
    product: 'Acuario Premium 20L',
    rating: 5,
    date: '2024-01-03'
  },
  {
    id: 6,
    name: 'Roberto Silva',
    petName: 'Spike',
    petType: '🦎',
    petBreed: 'Iguana Verde',
    image: '/assets/CentralPets_img/camaleon.avif',
    petImage: '/assets/CentralPets_img/camaleon.avif',
    testimonial: 'El terrario para Spike es increíble. Tiene el tamaño perfecto y la ventilación es excelente.',
    product: 'Terrario Tropical XL',
    rating: 5,
    date: '2024-01-01'
  },
  {
    id: 7,
    name: 'Carmen López',
    petName: 'Mimi',
    petType: '🐹',
    petBreed: 'Hámster Dorado',
    image: '/assets/CentralPets_img/hamster.avif',
    petImage: '/assets/CentralPets_img/hamster.avif',
    testimonial: 'Mimi adora su nueva rueda de ejercicio. Es muy silenciosa y de excelente calidad.',
    product: 'Rueda de Ejercicio Silent',
    rating: 5,
    date: '2023-12-28'
  },
  {
    id: 8,
    name: 'Diego Morales',
    petName: 'Bella',
    petType: '🐕',
    petBreed: 'Border Collie',
    image: '/assets/CentralPets_img/perro.avif',
    petImage: '/assets/CentralPets_img/perro.avif',
    testimonial: 'Bella se ve hermosa con su nuevo collar LED. Es perfecto para nuestros paseos nocturnos.',
    product: 'Collar LED Recargable',
    rating: 5,
    date: '2023-12-25'
  }
]

export const ClientesFelices: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">😊💖</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Clientes Felices
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conoce las historias reales de nuestros clientes y sus mascotas. 
          Cada sonrisa, cada cola que se mueve, cada ronroneo nos inspira a seguir mejorando.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="text-center p-6 bg-gradient-to-br from-pet-coral-50 to-pet-pink-50 border-2 border-pet-coral-200">
          <div className="text-3xl font-bold text-pet-coral-600 mb-2">10,000+</div>
          <div className="text-gray-600 font-medium">Mascotas Felices</div>
        </Card>
        <Card className="text-center p-6 bg-gradient-to-br from-pet-blue-50 to-pet-mint-50 border-2 border-pet-blue-200">
          <div className="text-3xl font-bold text-pet-blue-600 mb-2">5,000+</div>
          <div className="text-gray-600 font-medium">Familias Satisfechas</div>
        </Card>
        <Card className="text-center p-6 bg-gradient-to-br from-pet-mint-50 to-pet-yellow-50 border-2 border-pet-mint-200">
          <div className="text-3xl font-bold text-pet-mint-600 mb-2">4.9/5</div>
          <div className="text-gray-600 font-medium">Calificación Promedio</div>
        </Card>
        <Card className="text-center p-6 bg-gradient-to-br from-pet-purple-50 to-pet-pink-50 border-2 border-pet-purple-200">
          <div className="text-3xl font-bold text-pet-purple-600 mb-2">98%</div>
          <div className="text-gray-600 font-medium">Recomendarían</div>
        </Card>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {happyClients.map((client) => (
          <Card key={client.id} className="overflow-hidden bg-white border-2 border-pet-pink-200 hover:border-pet-coral-300 transition-all duration-300 hover:shadow-xl group">
            {/* Pet Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={client.petImage}
                alt={client.petName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-2xl mb-1">{client.petType}</div>
                <div className="font-bold text-lg">{client.petName}</div>
                <div className="text-sm opacity-90">{client.petBreed}</div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Client Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pet-pink-200"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">Dueño de {client.petName}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(client.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-pet-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">({client.rating}/5)</span>
              </div>

              {/* Testimonial */}
              <p className="text-gray-700 mb-4 italic">
                "{client.testimonial}"
              </p>

              {/* Product */}
              <div className="bg-gradient-to-r from-pet-pink-50 to-pet-blue-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-800">
                  Producto: <span className="text-pet-coral-600">{client.product}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Comprado el {new Date(client.date).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-pet-coral-100 to-pet-pink-100 rounded-2xl p-12 border-2 border-pet-coral-200">
        <div className="text-4xl mb-4">🌟</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          ¿Quieres ser nuestro próximo cliente feliz?
        </h2>
        <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Únete a miles de familias que ya confían en Central Pets para el cuidado de sus mascotas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary">
            <a href="/catalog">Explorar Productos 🛍️</a>
          </Button>
          <Button size="lg" variant="secondary">
            <a href="/contact">Contáctanos 💬</a>
          </Button>
        </div>
      </div>

      {/* Share Your Story */}
      <div className="mt-12 text-center">
        <Card className="p-8 bg-gradient-to-br from-pet-purple-50 to-pet-pink-50 border-2 border-pet-purple-200">
          <Heart className="h-12 w-12 text-pet-purple-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Comparte tu historia!
          </h3>
          <p className="text-gray-600 mb-6">
            Si eres cliente de Central Pets, nos encantaría conocer tu experiencia y la de tu mascota.
          </p>
          <Button variant="pet-special">
            <a href="/contact">Enviar mi Historia 📝</a>
          </Button>
        </Card>
      </div>
    </div>
  )
}