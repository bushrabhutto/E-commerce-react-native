

import { createContext, useContext, useState } from "react"

// Create context with default values
const CartContext = createContext({
  cart: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

// Simplified provider for debugging
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        // Update quantity if item exists
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  // Update quantity
  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook
export const useCart = () => {
  return useContext(CartContext)
}
