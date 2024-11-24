import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

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
}

const initialState: CartState = {
  items: cartItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 수량 증가
    increaseAmount: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    // 수량 감소: 0이 되면 removeItem 호출
    decreaseAmount: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.amount > 1) {
          item.amount -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload); // 자동 제거
        }
      }
    },
    // 아이템 삭제
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    // 장바구니 초기화
    resetCart: (state) => {
      state.items = [];
    },
  },
});

export const getTotalQuantity = (state: CartState) => {
  return state.items.reduce((total, item) => total + item.amount, 0);
};

export const { increaseAmount, decreaseAmount, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
