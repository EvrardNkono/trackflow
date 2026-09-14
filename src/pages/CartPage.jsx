// src/pages/CartPage.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Minus, Plus, Trash2, ShoppingBag, Mail, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const COMPANY_EMAIL = 'cargotrackflow@cargotrackflow.com'

const buildOrderEmailLink = (items, totalPrice, currency) => {
  const subject = `New order request — TrackFlow Shop`
  const lines = items.map(
    (i) => `- ${i.name} x${i.quantity} — ${i.currency} ${(Number(i.price) * i.quantity).toFixed(2)}`
  )
  const body = [
    'Hello TrackFlow team,',
    '',
    'I would like to place an order for the following item(s):',
    '',
    ...lines,
    '',
    `Total: ${currency} ${totalPrice.toFixed(2)}`,
    '',
    'Please let me know the next steps.',
    '',
    'Thank you.',
  ].join('\n')

  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const CartPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, currency, clearCart } = useCart()

  const orderEmailLink = buildOrderEmailLink(items, totalPrice, currency)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container-custom py-10">
        <Link to="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm mb-6">
          <ArrowLeft className="w-4 h-4" />
          Continue shopping
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <ShoppingBag className="w-14 h-14 mx-auto text-gray-300 mb-4" />
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/shop" className="text-orange-600 hover:underline font-medium">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-5">
                  <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 mb-3">{item.currency} {item.price} each</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900">
                    {item.currency} {(Number(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="p-5">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-400 hover:text-red-500"
                >
                  Clear cart
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 h-fit">
              <h2 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span>{currency} {totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Shipping & handling to be confirmed by our team.</p>
              <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-200 pt-4 mb-6">
                <span>Total</span>
                <span>{currency} {totalPrice.toFixed(2)}</span>
              </div>

              <a
                href={orderEmailLink}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Order via Email
              </a>
              <p className="text-xs text-gray-400 mt-3 text-center">
                This opens your email app with your order pre-filled, sent to {COMPANY_EMAIL}. Our team will follow up with payment and delivery details.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CartPage
