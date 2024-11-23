import { create } from "zustand";
import cartItems from "../constants/cartItems";

const useCart = create((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    // 증가
    increase: (itemId) => 
        set((state) => {
            const updatedCart = state.cartItems.map((cartItem) => {
                if (cartItem.id === itemId) {
                    return { ...cartItem, amount: cartItem.amount + 1 };
                }
                return cartItem;
            });
            return { cartItems: updatedCart };
        }),
    // 감소
    decrease: (itemId) => 
        set((state) => {
            const updatedCart = state.cartItems.map((cartItem) => {
                if (cartItem.id === itemId && cartItem.amount > 0) {
                    return { ...cartItem, amount: cartItem.amount - 1 };
                }
                return cartItem;
            });
            return { cartItems: updatedCart };
        }),
    // 아이템 제거
    removeItem: (itemId) => 
        set((state) => ({
            cartItems: state.cartItems.filter((cartItem) => cartItem.id !== itemId),
        })),
    // 올 클리어
    allClear: () => set({ cartItems: [] }),
    // total 계산
    calculateTotal: () => 
        set((state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            return { amount, total };
        }),
}));

export default useCart;
