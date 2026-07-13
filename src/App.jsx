import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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
import DeliveryNotifications from './components/DeliveryNotifications'

function App() {
  return (
    <AuthProvider>
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
      </div>
    </AuthProvider>
  )
}

export default App