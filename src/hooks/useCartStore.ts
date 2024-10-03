import { create } from "zustand"
import { persist } from "zustand/middleware"

const useCartStore = create(persist(
  (set) => ({
    cartItems: [],
    addItem: (item) => set((state) => {
      const existingItem = state.cartItems.find(i => i.id === item.id)
      if (existingItem) {
        return {
          cartItems: state.cartItems.map(i =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        }
      } else {
        return { cartItems: [...state.cartItems, { ...item, quantity: item.quantity }] }
      }
    }),
    removeItem: (documentId) => set((state) => ({
      cartItems: state.cartItems.filter(item => item.documentId !== documentId),
    })),
    changeQuantity: (documentId, value, stock, notify) => set((state) => {
      const item = state.cartItems.find(item => item.documentId === documentId)
      if (item) {
        const newQuantity = item.quantity + value
        if (newQuantity > stock) {
          notify("quantity", "", "No se puede subir la cantidad porque sobrepasa el disponible actualmente")
          return state
        }
        return {
          cartItems: state.cartItems.map(item =>
            item.documentId === documentId
              ? { ...item, quantity: Math.max(1, newQuantity) }
              : item
          )
        }
      }
      return state
    }),
    getCartItems: () => set((state) => state.cartItems),
    clearCart: () => set(() => ({
      cartItems: [],
    })),
  }),
  {
    name: "cart-storage",
  }
))

export default useCartStore
