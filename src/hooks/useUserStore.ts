import { create } from "zustand"
import { persist } from "zustand/middleware"

const useUserStore = create(persist(
  (set) => ({
    userData: {},
  
    saveUserData: (data) => set({ userData: { ...data } }),

    getUserData: () => set((state) => state.userData),
  }),
  {
    name: "user-data-storage",
  }
))

export default useUserStore