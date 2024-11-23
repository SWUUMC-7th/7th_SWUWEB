import styled from 'styled-components';
import Footer from "../components/Footer.jsx"
import { useSelector } from 'react-redux';
import CartItem from './CartItem.jsx';
import Modal from './Modal.jsx';
import { useState } from 'react';

const Container = styled.div`
    width: 100vw;
    background-color: #E6EAFF;
    position: absolute;
    top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Title = styled.div`
    font-size: 30px;
    font-weight: 700;
    margin-top:30px;
    margin-bottom: 20px; 
`;
const Empty = styled.div`
    height:calc(100vh - 140px);
    
`;
const MenuWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin-bottom: 50px; 
`;  
const Total=styled.div`
    width:800px;
    margin-top:30px;
    display:flex;
    justify-content: space-between; 
    border-top:2px solid #5852FF;
    div{
        margin-left:50px;
        width:100px;
        margin-top:10px;
    }
`;
const ResetBtn=styled.button`
    color:red;
    background:none;
    border:1px solid red;
    border-radius:10px;
    margin-bottom:50px;
`;

const CartContainer = () => {
    const [isModal, setIsModal]=useState(false);
    const { cartItems, total} = useSelector((store)=>store.cart);
    const isEmpty = !cartItems || cartItems.length === 0; 
    return (
        <Container>
            <Title>당신이 선택한 음반</Title>

            {isEmpty ? ( 
                <Empty>고객님이 좋아하시는 음반을 담아보세요~</Empty>
            ) : ( 
                <>
                    <MenuWrapper>
                        {cartItems.map((cart) => (
                            <CartItem key={cart.id} cart={cart} />
                        ))}
                        <Total>
                            <div>총 가격</div>
                            <div>{`₩${total}`}</div>
                        </Total>
                    </MenuWrapper>
                    {isModal && <Modal onClose={() => setIsModal(false)} />}
                    <ResetBtn onClick={() => setIsModal(true)}>장바구니 초기화</ResetBtn>
                </>
            )}
            <Footer />
        </Container>
    );
};

export default CartContainer;
