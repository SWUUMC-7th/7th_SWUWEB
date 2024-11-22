import styled from 'styled-components';
import CartIcon from '../constants/icons.jsx';

const Bar = styled.div `
    width:100vw;
    height:70px;
    background-color:#5852FF;
    display:flex;
    justify-content:space-around;
    position:absolute;
    top:0;
    *{
        color:white;
        font-size:30px;
        line-height:70px;
    }
`;
const Title=styled.div`
    width:800px;
    font-size:30px;
    font-weight:700;
`;
const Navbar = () =>{
    return(
        <Bar>
            <Title>UMC PlayList</Title>
            <CartIcon/>
        </Bar>
    )
}
export default Navbar