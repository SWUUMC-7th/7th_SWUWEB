import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import ClearCartButton from "./components/ClearCartButton";
import { calculateTotals } from "./store/cartSlice";

const App = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div>
      <h1>Music Cart</h1>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
      <ClearCartButton />
    </div>
  );
};

export default App;
