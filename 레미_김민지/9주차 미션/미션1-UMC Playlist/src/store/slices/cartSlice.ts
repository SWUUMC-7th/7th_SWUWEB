import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 아이템 추가
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    // 아이템 수량 증가
    increaseAmount: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },
    // 아이템 수량 감소
    decreaseAmount: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.amount > 1) {
        item.amount -= 1;
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

export const { addItem, increaseAmount, decreaseAmount, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
