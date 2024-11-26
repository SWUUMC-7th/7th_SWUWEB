import create from "zustand";

const useCartStore = create((set) => ({
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  isModalOpen: false,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, amount: i.amount + 1 } : i
          ),
        };
      } else {
        return {
          items: [...state.items, { ...item, amount: 1 }],
        };
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  increase: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, amount: Math.max(item.amount - 1, 1) }
          : item
      ),
    })),

  calculateTotals: () =>
    set((state) => {
      const totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
      const totalQuantity = state.items.reduce(
        (total, item) => total + item.amount,
        0
      );
      return { totalAmount, totalQuantity };
    }),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  clearCart: () => set({ items: [], totalAmount: 0, totalQuantity: 0 }),
}));

export default useCartStore;
