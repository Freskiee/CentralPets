import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './pages/Home'
import { Catalog } from './pages/Catalog'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Profile } from './pages/Profile'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { ClientesFelices } from './pages/ClientesFelices'
import { Admin } from './pages/Admin'
import { useAuthStore } from './store/auth'

function App() {
  const { setLoading } = useAuthStore()

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [setLoading])

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clientes-felices" element={<ClientesFelices />} />
          {/* Species routes */}
          <Route path="/especies/perros" element={<Catalog />} />
          <Route path="/especies/gatos" element={<Catalog />} />
          <Route path="/especies/conejos" element={<Catalog />} />
          <Route path="/especies/aves" element={<Catalog />} />
          <Route path="/especies/peces" element={<Catalog />} />
          <Route path="/especies/reptiles" element={<Catalog />} />
          <Route path="/especies/otros" element={<Catalog />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App