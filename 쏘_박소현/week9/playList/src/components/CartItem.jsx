import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import useCartStore from "../store/useCartStore";

const CartItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemTitle = styled.h4`
  margin: 0;
  font-size: 16px;
`;

const ItemSinger = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin: 0 5px;
  color: #5177ff;
`;

const CartItem = ({ item }) => {
  const { increase, decrease, removeItem, calculateTotals } = useCartStore(
    (state) => ({
      increase: state.increase,
      decrease: state.decrease,
      removeItem: state.removeItem,
      calculateTotals: state.calculateTotals,
    })
  );

  const handleIncrease = () => {
    increase(item.id);
    calculateTotals();
  };

  const handleDecrease = () => {
    decrease(item.id);
    calculateTotals();
  };

  const handleRemove = () => {
    removeItem(item.id);
    calculateTotals();
  };

  return (
    <CartItemWrapper>
      <ItemImage src={item.img} alt={item.title} />
      <ItemInfo>
        <ItemTitle>{item.title}</ItemTitle>
        <ItemSinger>{item.singer}</ItemSinger>
      </ItemInfo>
      <QuantityControls>
        <QuantityButton onClick={handleDecrease}>
          <IoIosArrowDown />
        </QuantityButton>
        <span>{item.amount}</span>
        <QuantityButton onClick={handleIncrease}>
          <IoIosArrowUp />
        </QuantityButton>
      </QuantityControls>
      <button onClick={handleRemove}>Remove</button>
    </CartItemWrapper>
  );
};

export default CartItem;
