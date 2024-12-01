import useCartStore from "../store/useCartStore";

const CartSummary = () => {
  const { totalAmount, totalQuantity } = useCartStore((state) => ({
    totalAmount: state.totalAmount,
    totalQuantity: state.totalQuantity,
  }));

  return (
    <div>
      <h3>Total Quantity: {totalQuantity}</h3>
      <h3>Total Amount: {totalAmount} 원</h3>
    </div>
  );
};

export default CartSummary;
