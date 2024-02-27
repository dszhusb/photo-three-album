import { create } from 'zustand'

export const useStore = create((set) => ({
    capsule: { url: '/images/placeholder.png', type: 'cube' },
    urlList: ['/9.JPG', '/10.JPG', '/11.JPG', '/12.JPG', '/13.JPG', '/14.JPG', '/15.JPG', '/16.JPG', "/17.jpg", "/18.jpg", "/19.jpg", "/20.jpg", "/21.jpg", "/22.jpg", "/23.jpg", "/24.jpg", "/25.jpg", "/26.jpg"],
    setCapsule: (cap) => set({ capsule: cap }),
    setUrlList: (list) => set({ urlList: list}),
}))