// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'trackflow_cart'

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          currency: product.currency,
          image: product.images?.[0]?.url || null,
          quantity,
        },
      ]
    })
    setIsCartOpen(true)
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.quantity, 0),
    [items]
  )

  const currency = items[0]?.currency || 'USD'

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        currency,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}

export default CartContext
