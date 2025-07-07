import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <>
      {/* GIF local arriba del footer */}
      <img
        src="/assets/cat_gif.gif"
        alt="Cat GIF"
        className="mx-auto mb-2 md:mb-4 w-full max-w-[120px] sm:max-w-[140px] md:max-w-[180px]"
        style={{ display: 'block' }}
      />

      {/* Footer móvil */}
      {/* Footer único y responsivo */}
      <footer className="bg-gradient-to-br from-gray-900 via-pet-purple-900 to-gray-900 text-white py-2 px-4 mt-2">
        {/* Móvil */}
        <div className="md:hidden flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center justify-center mb-1">
            <Link to="/">
  <img
    src="/assets/logo.png"
    alt="Central Pets Logo"
    className="h-14 md:h-20 w-auto object-contain mx-auto drop-shadow-lg"
  />
</Link>
          </div>
          <div className="flex space-x-4 mb-1">
            <a href="/catalog" className="text-gray-300 hover:text-white text-sm transition-colors">Catálogo</a>
            <a href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">Contacto</a>
          </div>
          {/* Mini tarjetas */}
          <div className="flex items-center justify-center space-x-2 mt-1 mb-1 bg-pet-purple-800/70 rounded-lg px-3 py-1">
            <svg width="32" height="12" viewBox="0 0 32 12"><text x="6" y="9" fontSize="7" fill="#1a1f71" fontWeight="bold">VISA</text></svg>
            <svg width="32" height="12" viewBox="0 0 32 12"><circle cx="13" cy="6" r="4" fill="#eb001b"/><circle cx="19" cy="6" r="4" fill="#f79e1b"/></svg>
            <svg width="32" height="12" viewBox="0 0 32 12"><text x="4" y="9" fontSize="7" fill="#2e77bb" fontWeight="bold">AMEX</text></svg>
            <svg width="32" height="12" viewBox="0 0 32 12"><text x="2" y="9" fontSize="7" fill="#003087" fontWeight="bold">PayPal</text></svg>
          </div>
          <div className="flex space-x-3 mt-1">
            <Facebook className="h-5 w-5 text-gray-400 hover:text-pet-blue-400 cursor-pointer transition-colors" />
            <Instagram className="h-5 w-5 text-gray-400 hover:text-pet-pink-400 cursor-pointer transition-colors" />
          </div>
          <p className="text-[10px] text-gray-400 mt-1"> 2024 Central Pets</p>
        </div>
        {/* Escritorio y tablet */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          {/* Info y redes */}
          <div className="space-y-4 col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Link to="/">
  <img
    src="/assets/logo.png"
    alt="Central Pets Logo"
    className="h-20 w-auto object-contain drop-shadow-lg"
  />
</Link>
            </div>
            <p className="text-gray-300 text-center md:text-left">
              Tu tienda de confianza para accesorios de mascotas. Calidad y amor para todos tus compañeros peludos, emplumados y escamosos.
            </p>
            <div className="flex space-x-4 justify-center mt-2 z-10">
              <a href="https://www.facebook.com/Biospii" target="_blank" rel="noopener noreferrer" className="hover:text-pet-coral-400 transition-colors" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/biospi_mx/" target="_blank" rel="noopener noreferrer" className="hover:text-pet-coral-400 transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://biospi.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-pet-coral-400 transition-colors" aria-label="Sitio web">
                <Globe className="h-6 w-6" />
              </a>
            </div>
          </div>
          {/* Enlaces rápidos */}
          <div className="space-y-4 col-span-1">
            <h3 className="text-lg font-semibold text-pet-coral-400">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/catalog" className="text-gray-300 hover:text-white transition-colors">🛍️ Catálogo</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">💝 Nosotros</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">📞 Contacto</a></li>
              <li><a href="/clientes-felices" className="text-gray-300 hover:text-white transition-colors">😊 Clientes Felices</a></li>
            </ul>
          </div>
          {/* Especies */}
          <div className="space-y-4 col-span-1">
            <h3 className="text-lg font-semibold text-pet-mint-400">Por Especies</h3>
            <ul className="space-y-2">
              <li><a href="/especies/perros" className="text-gray-300 hover:text-white transition-colors">🐕 Perros</a></li>
              <li><a href="/especies/gatos" className="text-gray-300 hover:text-white transition-colors">🐱 Gatos</a></li>
              <li><a href="/especies/conejos" className="text-gray-300 hover:text-white transition-colors">🐰 Conejos</a></li>
              <li><a href="/especies/aves" className="text-gray-300 hover:text-white transition-colors">🐦 Aves</a></li>
              <li><a href="/especies/peces" className="text-gray-300 hover:text-white transition-colors">🐠 Peces</a></li>
              <li><a href="/especies/reptiles" className="text-gray-300 hover:text-white transition-colors">🦎 Reptiles</a></li>
            </ul>
          </div>
          {/* Métodos de Pago y copyright */}
          <div className="space-y-4 col-span-1 flex flex-col items-center md:items-end justify-between">
            <div>
              <h3 className="text-lg font-semibold text-pet-yellow-300">Métodos de Pago</h3>
              <div className="flex items-center justify-center md:justify-end space-x-2 bg-pet-purple-800/70 rounded-lg px-3 py-1 mt-2">
                <svg width="32" height="12" viewBox="0 0 32 12"><text x="6" y="9" fontSize="7" fill="#1a1f71" fontWeight="bold">VISA</text></svg>
                <svg width="32" height="12" viewBox="0 0 32 12"><circle cx="13" cy="6" r="4" fill="#eb001b"/><circle cx="19" cy="6" r="4" fill="#f79e1b"/></svg>
                <svg width="32" height="12" viewBox="0 0 32 12"><text x="4" y="9" fontSize="7" fill="#2e77bb" fontWeight="bold">AMEX</text></svg>
                <svg width="32" height="12" viewBox="0 0 32 12"><text x="2" y="9" fontSize="7" fill="#003087" fontWeight="bold">PayPal</text></svg>
              </div>
            </div>
            <div className="text-center md:text-right text-xs text-gray-400 mt-4 md:mt-8">
              © 2024 Central Pets. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}