import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ReviewsPage from './pages/ReviewsPage'
import BlogPage from './pages/BlogPage'
import BlogDetailsPage from './pages/BlogDetailsPage'  // 🆕 Import du détail du blog
import ContactPage from './pages/ContactPage'
import AdminPage from './pages/AdminPage'
import TrackingDetailsPage from './pages/TrackingDetailsPage'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CartPage from './pages/CartPage'
import DeliveryNotifications from './components/DeliveryNotifications'
import CartDrawer from './components/CartDrawer'
import FloatingContactButton from './components/FloatingContactButton'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailsPage />} />  {/* 🆕 Détails du blog */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tracking/:id" element={<TrackingDetailsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            
            {/* Protected Admin Route */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
          
          {/* ✅ Notifications visibles sur TOUTES les pages */}
          <DeliveryNotifications />

          {/* Cart drawer + floating contact button, site-wide */}
          <CartDrawer />
          <FloatingContactButton />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App