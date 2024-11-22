import {createSlice} from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItem'

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

        //감소
        //아이템 제거
        //올 클리어
        //total 계산
    }
})

export default cartSlice.reducer