import {createSlice} from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems'
const initialState={
    cartItems: cartItems,
    amount:0,
    total:0,
}

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        //증가
        increase:(state,{payload})=>{
            const itemId=payload;
            const item=state.cartItems.find((cartItem)=>cartItem.id===itemId)
            item.amount+=1;
        },
        //감소
        decrease:(state,{payload})=>{
            const itemId=payload;
            const item=state.cartItems.find((cartItem)=>cartItem.id===itemId)
            item.amount-=1;
        },
        //아이템 제거
        removeItem:(state,{payload})=>{
            const itemId=payload;
            state.cartItems =state.cartItems.filter((cartItem)=>cartItem.id!==itemId)
        },
        //올 클리어
        allClear:(state)=>{
            state.cartItems=[];
        },
        //total 계산
        calculateTotal:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach((item)=>{
                amount+=item.amount;
                total+=item.amount*item.price;
            })
            state.amount=amount;
            state.total=total;
        }
    }
})

export const {increase, decrease, removeItem, allClear, calculateTotal} = cartSlice.actions;
export default cartSlice.reducer