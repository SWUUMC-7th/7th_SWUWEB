import styled from 'styled-components';
import Icons from '../constants/icons.jsx';
import Footer from "../components/Footer.jsx"
import { useSelector } from 'react-redux';

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
const MenuWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    margin-bottom: 50px; 
`;
const Menu = styled.div`
    width: 800px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: space-around; 
    svg {
        width: 20px; 
        height: 20px; 
    }
`;
const Img = styled.img`
    width: 100px;
    height: 100px;
`;
const Div = styled.div`
    width:600px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    div:first-child {
        color: black;
    }
`;
const AmountWrapper=styled.div`
    width:50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Button=styled.button`
    width:50px;
    height:30px;
    line-height:20px;
    padding:5px;
    background:none;
    color:#5852FF;
`;
const Amount=styled.div`
    margin-left:20px;
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
    const { cartItems, total} = useSelector((store)=>store.cart);
    return (
        <Container>
            <Title>당신이 선택한 음반</Title>
            <MenuWrapper>
                {cartItems.map((cart) => (
                    <Menu key={cart.id}>
                        <Img src={cart.img} />
                        <Div>
                            <div>{`${cart.title} | ${cart.singer}`}</div>
                            <div>{`₩${cart.price}`}</div>
                        </Div>
                        <AmountWrapper>
                            <Button><Icons.ChevronUp/></Button>
                            <Amount>{cart.amount}</Amount>
                            <Button><Icons.ChevronDown/></Button>
                        </AmountWrapper>
                    </Menu>
                ))}
                <Total>
                    <div>총 가격</div>
                    <div>{`₩${total}`}</div>
                </Total>
            </MenuWrapper>
            <ResetBtn>장바구니 초기화</ResetBtn>
            <Footer/>
        </Container>
    );
};

export default CartContainer;
