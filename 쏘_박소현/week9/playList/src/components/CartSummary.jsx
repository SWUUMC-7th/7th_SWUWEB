import { useSelector } from "react-redux";

const CartSummary = () => {
  const { totalAmount, totalQuantity } = useSelector((state) => state.cart);

  return (
    <div>
      <h3>Total Quantity: {totalQuantity}</h3>
      <h3>Total Amount: {totalAmount} 원</h3>
    </div>
  );
};

export default CartSummary;
