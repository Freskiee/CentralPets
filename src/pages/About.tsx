import React from 'react'
import { Heart, Award, Users, Shield } from 'lucide-react'
import { Card } from '../components/UI/Card'

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Acerca de Central Pets
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Somos una empresa dedicada a brindar productos de calidad y amor para tus mascotas. 
          Desde 2020, nos hemos convertido en la tienda de confianza para miles de familias pet-friendly.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Heart className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Amor por las Mascotas</h3>
          <p className="text-gray-600">
            Entendemos el vínculo especial entre tú y tu mascota. Cada producto es seleccionado pensando en su bienestar.
          </p>
        </Card>
        
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <Award className="h-8 w-8 text-teal-500" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Calidad Garantizada</h3>
          <p className="text-gray-600">
            Trabajamos solo con las mejores marcas y proveedores para asegurar productos de alta calidad.
          </p>
        </Card>
        
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Comunidad Pet</h3>
          <p className="text-gray-600">
            Formamos parte de una comunidad de amantes de las mascotas comprometidos con su cuidado.
          </p>
        </Card>
        
        <Card className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mb-2">Compra Segura</h3>
          <p className="text-gray-600">
            Garantizamos transacciones seguras y un servicio al cliente excepcional en cada compra.
          </p>
        </Card>
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Central Pets nació en 2020 con una misión simple: hacer que el cuidado de las mascotas 
              sea más fácil y accesible para todas las familias. Comenzamos como una pequeña tienda 
              local con la pasión de ayudar a las mascotas y sus dueños.
            </p>
            <p>
              Con el tiempo, hemos crecido para convertirnos en una plataforma digital completa, 
              ofreciendo una amplia gama de productos desde alimentos premium hasta accesorios de lujo, 
              siempre manteniendo nuestro compromiso con la calidad y el servicio excepcional.
            </p>
            <p>
              Hoy, servimos a miles de familias en todo el país, y seguimos expandiendo nuestro 
              catálogo para incluir las últimas innovaciones en cuidado de mascotas.
            </p>
          </div>
        </div>
        
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
            alt="Mascota feliz"
            className="rounded-lg shadow-lg w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
        </div>
      </div>

      {/* Team */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Ana García',
              role: 'Fundadora & CEO',
              image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              bio: 'Veterinaria con 15 años de experiencia, amante de los animales y emprendedora.'
            },
            {
              name: 'Carlos Rodríguez',
              role: 'Director de Operaciones',
              image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              bio: 'Especialista en logística y distribución, garantiza que tus pedidos lleguen a tiempo.'
            },
            {
              name: 'María López',
              role: 'Especialista en Productos',
              image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
              bio: 'Experta en nutrición animal, selecciona cuidadosamente cada producto de nuestro catálogo.'
            }
          ].map((member, index) => (
            <Card key={index} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
              <p className="text-orange-500 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-orange-500 to-teal-500 rounded-lg p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Central Pets en Números</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10,000+</div>
            <div className="text-orange-100">Mascotas Felices</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">5,000+</div>
            <div className="text-orange-100">Clientes Satisfechos</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">1,200+</div>
            <div className="text-orange-100">Productos Disponibles</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.9/5</div>
            <div className="text-orange-100">Calificación Promedio</div>
          </div>
        </div>
      </div>
    </div>
  )
}