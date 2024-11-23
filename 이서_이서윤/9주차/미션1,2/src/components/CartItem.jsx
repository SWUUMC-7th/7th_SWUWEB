import styled from "styled-components"
import PropTypes from 'prop-types'; 
import Icons from '../constants/icons.jsx';
import { useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cart/cartSlice.js";

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

const CartItem=({cart})=>{
    const dispatch = useDispatch();
    return(
        <Menu key={cart.id}>
            <Img src={cart.img} />
            <Div>
                <div>{`${cart.title} | ${cart.singer}`}</div>
                <div>{`₩${cart.price}`}</div>
            </Div>
            <AmountWrapper>
                <Button onClick={()=>dispatch(increase(cart.id))}><Icons.ChevronUp/></Button>
                <Amount>{cart.amount}</Amount>
                <Button onClick={()=>{
                    if(cart.amount===1){
                        dispatch(removeItem(cart.id));
                        return;
                    }
                    dispatch(decrease(cart.id));
                }}><Icons.ChevronDown/></Button>
            </AmountWrapper>
        </Menu>
    )
}
CartItem.propTypes = {
    cart: PropTypes.array.isRequired,
};
export default CartItem