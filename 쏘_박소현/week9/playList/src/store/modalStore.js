import create from "zustand";

const useStore = create((set) => ({
  isOpen: false,
  cart: [],
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  clearCart: () => set({ cart: [] }),
}));

export default useStore;
