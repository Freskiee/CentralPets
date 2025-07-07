import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Settings, Heart, PawPrint, Menu, X, UserCircle } from 'lucide-react'
import { useAuthStore } from '../../store/auth'
import { useCartStore } from '../../store/cart'

export const Header: React.FC = () => {
  const { user, logout, isLoading } = useAuthStore()
  const { getTotalItems } = useCartStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const handleSpeciesClick = (species: string) => {
    navigate(`/especies/${species}`)
    setIsMobileMenuOpen(false)
  }

  const species = [
    { id: 'perros', name: 'Perros', icon: '🐕' },
    { id: 'gatos', name: 'Gatos', icon: '🐱' },
    { id: 'conejos', name: 'Conejos', icon: '🐰' },
    { id: 'aves', name: 'Aves', icon: '🐦' },
    { id: 'peces', name: 'Peces', icon: '🐠' },
    { id: 'reptiles', name: 'Reptiles', icon: '🦎' },
    { id: 'otros', name: 'Otros', icon: '🐹' }
  ]

  return (
    <header className="bg-gradient-to-r from-pet-pink-100 via-pet-blue-100 to-pet-mint-100 shadow-xl border-b-4 border-pet-coral-400 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/logo.png"
              alt="Central Pets Logo"
              className="h-12 md:h-16 w-auto object-contain drop-shadow-lg"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-pet-coral-500 transition-colors font-medium text-lg">
              🏠 Inicio
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-pet-coral-500 transition-colors font-medium text-lg">
              🛍️ Tienda
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-pet-coral-500 transition-colors font-medium text-lg">
                🐾 Especies
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-2 border-pet-pink-200">
                {species.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => handleSpeciesClick(spec.id)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pet-pink-50 hover:text-pet-coral-600 flex items-center space-x-2"
                  >
                    <span>{spec.icon}</span>
                    <span>{spec.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <Link to="/about" className="text-gray-700 hover:text-pet-coral-500 transition-colors font-medium text-lg">
              💝 Nosotros
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-pet-coral-500 transition-colors font-medium text-lg">
              📞 Contacto
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-3 text-gray-700 hover:text-pet-coral-500 transition-colors bg-white rounded-full shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-pet-coral-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 text-gray-700 hover:text-pet-coral-500 transition-colors bg-white rounded-full shadow-md hover:shadow-lg"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* User Menu - Desktop */}
            {!isLoading && user ? (
              <div className="relative group hidden lg:block">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-pet-coral-500 transition-colors bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg">
                  <UserCircle className="h-6 w-6" />
                  <span className="hidden sm:block font-medium">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border-2 border-pet-pink-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pet-pink-50 flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-pet-pink-50 flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Mi Carrito ({getTotalItems()})</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-pet-pink-50 flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Administración</span>
                    </Link>
                  )}
                  <hr className="my-2 border-pet-pink-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pet-pink-50 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            ) : !isLoading && (
              <Link
                to="/login"
                className="hidden lg:block bg-gradient-to-r from-pet-coral-500 to-pet-pink-500 text-white px-6 py-3 rounded-full hover:from-pet-coral-600 hover:to-pet-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Iniciar Sesión
              </Link>
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="hidden lg:block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pet-coral-500"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay para cerrar tocando fuera */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`
          fixed inset-0 z-50 bg-white/95 backdrop-blur-sm border-t border-pet-pink-200 transition-transform duration-300 overflow-y-auto
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:hidden
        `}
        style={{ willChange: 'transform' }}
      >
        {/* Botón de cerrar menú móvil */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-pet-coral-500 z-50"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <X className="h-8 w-8" />
        </button>
        <div className="px-4 py-4 space-y-4 pb-safe">
          {/* Main Navigation */}
          <div className="space-y-2">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
            >
              🏠 Inicio
            </Link>
            <Link 
              to="/catalog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
            >
              🛍️ Tienda
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
            >
              💝 Nosotros
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
            >
              📞 Contacto
            </Link>
          </div>

          {/* Species Section */}
          <div className="border-t border-pet-pink-200 pt-4">
            <h3 className="px-4 py-2 text-sm font-bold text-gray-500 uppercase tracking-wide">
              🐾 Especies
            </h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {species.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => handleSpeciesClick(spec.id)}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors text-left"
                >
                  <span className="text-lg">{spec.icon}</span>
                  <span>{spec.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Section */}
          {!isLoading && user ? (
            <div className="border-t border-pet-pink-200 pt-4 space-y-2">
              <div className="px-4 py-2 text-sm text-gray-600">
                Hola, <span className="font-medium text-pet-coral-600">{user.name}</span>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Mi Perfil</span>
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Mi Carrito ({getTotalItems()})</span>
              </Link>
              {user.role === 'admin' && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Administración</span>
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 hover:text-pet-coral-500 font-medium rounded-lg hover:bg-pet-pink-50 transition-colors text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          ) : !isLoading && (
            <div className="border-t border-pet-pink-200 pt-4">
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-pet-coral-500 to-pet-pink-500 text-white px-6 py-3 rounded-full hover:from-pet-coral-600 hover:to-pet-pink-600 transition-all duration-300 font-medium shadow-lg text-center"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-pet-blue-500 to-pet-mint-500 text-white px-6 py-3 rounded-full hover:from-pet-blue-600 hover:to-pet-mint-600 transition-all duration-300 font-medium shadow-lg text-center"
                >
                  Crear Cuenta
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}