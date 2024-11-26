import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

const ClearCartButton = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return <button onClick={handleClearCart}>Clear Cart</button>;
};

export default ClearCartButton;
