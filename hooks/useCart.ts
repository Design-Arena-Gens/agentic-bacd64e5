'use client';

import { create } from 'zustand';
import type { Service } from '../types';

type CartItem = {
  service: Service;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (service: Service) => void;
  removeItem: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clear: () => void;
};

const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (service) =>
    set((state) => {
      const existing = state.items.find((item) => item.service.id === service.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.service.id === service.id
              ? { ...item, quantity: Math.min(item.quantity + 1, service.availability) }
              : item
          )
        };
      }
      return { items: [...state.items, { service, quantity: 1 }] };
    }),
  removeItem: (serviceId) =>
    set((state) => ({
      items: state.items.filter((item) => item.service.id !== serviceId)
    })),
  updateQuantity: (serviceId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.service.id === serviceId ? { ...item, quantity } : item
      )
    })),
  clear: () => set(() => ({ items: [] }))
}));

export default function useCart() {
  return useCartStore();
}
