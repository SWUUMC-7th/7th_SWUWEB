import { create } from "zustand";
import cartItems from "../constants/cartItems";

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  resetCart: () => void;
  increaseAmount: (id: string) => void;
  decreaseAmount: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: cartItems,
  resetCart: () =>
    set(() => ({
      items: [],
    })),
  increaseAmount: (id: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      ),
    })),
  decreaseAmount: (id: string) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount > 1 ? item.amount - 1 : 0 } : item,
        )
        .filter((item) => item.amount > 0), // 수량이 0이면 제거
    })),
}));
