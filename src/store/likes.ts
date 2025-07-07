import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LikesState {
  likedProducts: string[]
  isLoading: boolean
  error: string | null
  addLike: (productId: string) => Promise<void>
  removeLike: (productId: string) => Promise<void>
  isLiked: (productId: string) => boolean
  getLikedCount: () => number
  loadLikes: () => Promise<void>
  setLikes: (likes: string[]) => void
}

export const useLikesStore = create<LikesState>()(
  persist(
    (set, get) => ({
      likedProducts: [],
      isLoading: false,
      error: null,

      addLike: async (productId: string) => {
        const currentLikes = get().likedProducts
        if (currentLikes.includes(productId)) return

        // Optimistic update
        set({ likedProducts: [...currentLikes, productId] })

        // In real app, this would sync with backend
        // For now, just keep the optimistic update
      },

      removeLike: async (productId: string) => {
        const currentLikes = get().likedProducts
        const newLikes = currentLikes.filter(id => id !== productId)
        
        // Optimistic update
        set({ likedProducts: newLikes })

        // In real app, this would sync with backend
        // For now, just keep the optimistic update
      },

      isLiked: (productId: string) => {
        return get().likedProducts.includes(productId)
      },

      getLikedCount: () => {
        return get().likedProducts.length
      },

      loadLikes: async () => {
        // In real app, this would load from backend
        // For now, likes are persisted locally
        set({ isLoading: false })
      },

      setLikes: (likes: string[]) => {
        set({ likedProducts: likes })
      },
    }),
    {
      name: 'likes-storage',
      partialize: (state) => ({ likedProducts: state.likedProducts }),
    }
  )
)