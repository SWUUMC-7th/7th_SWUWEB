import Navbar from "./components/Navbar"
import CartContainer from "./components/CartContainer"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import { calculateTotal } from "./features/cart/cartSlice";

function App() {
  const dispatch=useDispatch();
  const {cartItems}=useSelector((store)=>store)
  useEffect(()=>{
    dispatch(calculateTotal());
  },[cartItems,dispatch])
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <CartContainer/>
    </>
  )
}

export default App
