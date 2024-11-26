import { useDispatch } from "react-redux";
import { openModal } from "../store/modalSlice";

const ClearCartButton = () => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    console.log("Opening modal...");
    dispatch(openModal());
  };

  return <button onClick={handleClearCart}>Clear Cart</button>;
};

export default ClearCartButton;
