import { create } from 'zustand'

export const useStore = create((set) => ({
    capsule: { url: '/images/placeholder.png', type: 'cube' },
    setCapsule: (cap) => set({ capsule: cap }),
}))