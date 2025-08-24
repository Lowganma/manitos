import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      add: (course) => {
        const exists = get().items.find((i) => i.id === course.id);
        if (!exists) set((s) => ({ items: [...s.items, course] }));
      },
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price_cents, 0)
    }),
    { name: 'cart-store' }
  )
);
