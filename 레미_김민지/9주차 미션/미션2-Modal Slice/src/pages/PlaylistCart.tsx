import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { increaseAmount, decreaseAmount, resetCart } from "../store/slices/cartSlice";

const PlaylistCart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseInt(item.price) * item.amount, 0);
  };
  const totalQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.amount, 0),
  );

  return (
    <Container>
      <Header>
        <Title>UMC PlayList</Title>
        <CartIcon>
          🛒<CartCount>{totalQuantity}</CartCount>
        </CartIcon>
      </Header>
      <Content>
        <SectionTitle>당신이 선택한 음반</SectionTitle>
        <AlbumList>
          {cartItems.map((item) => (
            <AlbumItem key={item.id}>
              <AlbumImage src={item.img} alt={item.title} />
              <AlbumInfo>
                <AlbumTitle>
                  {item.title} | {item.singer}
                </AlbumTitle>
                <AlbumPrice>₩ {parseInt(item.price).toLocaleString()}</AlbumPrice>
              </AlbumInfo>
              <QuantityControl>
                <QuantityButton onClick={() => dispatch(increaseAmount(item.id))}>⬆</QuantityButton>
                <QuantityText>{item.amount}</QuantityText>
                <QuantityButton onClick={() => dispatch(decreaseAmount(item.id))}>⬇</QuantityButton>
              </QuantityControl>
            </AlbumItem>
          ))}
        </AlbumList>
        <TotalSection>
          <TotalLabel>총 가격</TotalLabel>
          <TotalPrice>₩ {calculateTotal().toLocaleString()}</TotalPrice>
        </TotalSection>
        <ResetButton onClick={() => dispatch(resetCart())}>장바구니 초기화</ResetButton>
      </Content>
    </Container>
  );
};

export default PlaylistCart;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #201e1e;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid #676aff;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #ffefef;
`;

const CartIcon = styled.div`
  position: relative;
  font-size: 28px;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #6a6dff;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 6px;
  border-radius: 50%;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #d1d1d1;
  margin-bottom: 20px;
`;

const AlbumList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AlbumItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #9fa1ff;
`;

const AlbumImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
`;

const AlbumInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const AlbumTitle = styled.p`
  font-size: 16px;
  color: #f5f0f0;
  margin: 0 0 5px;
`;

const AlbumPrice = styled.p`
  font-size: 14px;
  color: #acacac;
  margin: 0;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  font-size: 20px;
  color: #fffcfe;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #636363;
  }
`;

const QuantityText = styled.span`
  margin: 0 10px;
  font-size: 16px;
  color: #ffffff;
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  padding-top: 10px;
`;

const TotalLabel = styled.span`
  font-size: 16px;
  color: #f3f3f3;
  font-weight: bold;
`;

const TotalPrice = styled.span`
  font-size: 16px;
  color: #9fa1ff;
  font-weight: bold;
`;

const ResetButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  color: #ffffff;
  background-color: #ff0000;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #971b0d;
  }
`;
