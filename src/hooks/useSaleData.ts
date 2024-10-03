import { create } from "zustand"
import { persist } from "zustand/middleware"

const useSaleData = create(persist(
  (set) => ({
    saleData: {},
  
    saveSaleData: (data) => set({ saleData: { ...data } }),

    getSaleData: () => set((state) => state.saleData),
  }),
  {
    name: "sale-data-storage",
  }
))

export default useSaleData