// src/admin/AdminLayout.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Package, Plus, List, Home } from 'lucide-react'

const AdminLayout = ({ children }) => {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'New Shipment', path: '/admin/create', icon: Plus },
    { name: 'All Shipments', path: '/admin/shipments', icon: List },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-orange-600 shadow-lg sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            <Link to="/admin" className="flex items-center gap-2 text-white">
              <Package className="w-6 h-6" />
              <span className="font-bold text-lg">Admin Dashboard</span>
            </Link>
            <Link to="/" className="text-white/80 hover:text-white text-sm transition-colors">
              ← Back to Site
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg min-h-[calc(100vh-64px)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout