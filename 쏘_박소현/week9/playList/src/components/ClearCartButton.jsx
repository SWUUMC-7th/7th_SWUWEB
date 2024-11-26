import useCartStore from "../store/useCartStore";

const ClearCartButton = () => {
  const openModal = useCartStore((state) => state.openModal);

  const handleClearCart = () => {
    openModal();
  };

  return <button onClick={handleClearCart}>Clear Cart</button>;
};

export default ClearCartButton;
