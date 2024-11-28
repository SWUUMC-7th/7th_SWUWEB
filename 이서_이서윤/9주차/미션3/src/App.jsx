import Navbar from "./components/Navbar"
import CartContainer from "./components/CartContainer"
import { useEffect } from "react"
import useCart from "./store/useCart";

function App() {
  const {cartItems,calculateTotal}=useCart();
  useEffect(()=>{
    calculateTotal()
  },[cartItems,calculateTotal])
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
