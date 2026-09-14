// src/components/CartDrawer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
    currency,
  } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-600" />
            Your Cart ({totalItems})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 py-16">
              <ShoppingBag className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              Your cart is empty.
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 border-b border-gray-100 pb-4">
                <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.currency} {item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 p-5 space-y-4">
            <div className="flex justify-between font-semibold text-gray-900">
              <span>Total</span>
              <span>{currency} {totalPrice.toFixed(2)}</span>
            </div>
            <Link
              to="/cart"
              onClick={() => setIsCartOpen(false)}
              className="block text-center w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              View Cart & Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartDrawer
