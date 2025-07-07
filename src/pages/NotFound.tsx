import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pet-pink-200 via-pet-blue-100 to-pet-mint-100 text-gray-800">
      <img src="/assets/logo.png" alt="Central Pets Logo" className="h-32 w-auto mb-6 drop-shadow-lg animate-bounce-slow" />
      <h1 className="text-5xl font-bold mb-4 text-pet-coral-600">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">¡Página no encontrada!</h2>
      <p className="mb-8 text-lg text-gray-600">La ruta que buscas no existe o fue movida.</p>
      <Link to="/" className="bg-pet-coral-500 hover:bg-pet-coral-600 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-all duration-300">Volver al inicio</Link>
    </div>
  );
}
