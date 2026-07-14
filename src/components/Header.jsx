// src/components/Header.jsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/images/logo.png'
import LoginModal from './LoginModal'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Customer Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ]

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault()
    }
    
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount >= 5) {
      setIsLoginModalOpen(true)
      setClickCount(0)
    }
  }

  return (
    <>
      <header className="bg-orange-600 shadow-lg sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center h-20 md:h-[120px]">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center flex-shrink-0 cursor-pointer"
              onClick={handleLogoClick}
              title="Click 5 times to access admin"
            >
              <img 
                src={logo} 
                alt="Cargo Track Flow Express" 
                className="w-40 h-40 md:w-[308px] md:h-[308px] object-contain"
              />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-white uppercase text-xs font-bold tracking-wider hover:text-orange-200 transition-colors duration-200 ${
                    location.pathname === item.path ? 'text-orange-200' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="#tracking"
                className="bg-white text-orange-600 px-6 py-2 rounded hover:bg-orange-100 transition-all duration-200 font-medium text-sm"
              >
                Track Shipment
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center">
                <span 
                  className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ease-in-out origin-top-left ${
                    isMobileMenuOpen ? 'rotate-45 translate-x-0.5' : ''
                  }`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span 
                  className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 ease-in-out origin-bottom-left ${
                    isMobileMenuOpen ? '-rotate-45 translate-x-0.5' : ''
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div 
            className={`md:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out transform ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <img 
                src={logo} 
                alt="Cargo Track Flow Express" 
                className="h-12 w-auto object-contain"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-6 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'bg-orange-50 text-orange-600 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-100">
                <a
                  href="#tracking"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Track Shipment
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  )
}

export default Header