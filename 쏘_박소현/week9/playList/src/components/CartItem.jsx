import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  increase,
  decrease,
  removeItem,
  calculateTotals,
} from "../store/cartSlice";
import { ChevronUp, ChevronDown } from "../constants/icons";

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
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increase(item.id));
    dispatch(calculateTotals());
  };

  const handleDecrease = () => {
    dispatch(decrease(item.id));
    dispatch(calculateTotals());
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
    dispatch(calculateTotals());
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
          <ChevronDown />
        </QuantityButton>
        <span>{item.amount}</span>
        <QuantityButton onClick={handleIncrease}>
          <ChevronUp />
        </QuantityButton>
      </QuantityControls>
      <button onClick={handleRemove}>Remove</button>
    </CartItemWrapper>
  );
};

export default CartItem;
