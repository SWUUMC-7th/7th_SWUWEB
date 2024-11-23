import styled from 'styled-components';
import Icons from '../constants/icons.jsx';
import useCart from '../store/useCart.js';
const Bar = styled.div `
    width:100vw;
    height:70px;
    background-color:#5852FF;
    display:flex;
    justify-content:space-around;
    align-items: center;
    position:absolute;
    top:0;
    *{
        color:white;
        font-size:30px;
    }
    svg {
        width: 50px; 
        height: 50px; 
    }
`;
const Title=styled.div`
    width:800px;
    font-weight:700;
`;
const AmountIcon=styled.div`
    width:20px;
    height:20px;
    background-color:white;
    border-radius:20px;
    font-size:12px;
    font-weight:700;
    color:#5852FF;
    text-align:center;
    margin-top:-30px;
    margin-left:35px;
`;
const Navbar = () =>{
    const {amount} = useCart();
    return(
        <Bar>
            <Title>UMC PlayList - zustand</Title>
            <div>
                <Icons.CartIcon/>
                <AmountIcon>{amount}</AmountIcon>
            </div>
        </Bar>
    )
}
export default Navbar