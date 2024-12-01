import { useEffect } from "react";
import useCartStore from "./store/useCartStore";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import ClearCartButton from "./components/ClearCartButton";
import Modal from "./components/Modal";

const App = () => {
  const { items, calculateTotals } = useCartStore((state) => ({
    items: state.items,
    calculateTotals: state.calculateTotals,
  }));

  useEffect(() => {
    calculateTotals();
  }, [items, calculateTotals]);

  return (
    <div>
      <h1>Music Cart</h1>
      <div>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CartSummary />
      <ClearCartButton />
      <Modal />
    </div>
  );
};

export default App;
