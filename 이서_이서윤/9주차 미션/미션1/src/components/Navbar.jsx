import styled from 'styled-components';
import Icons from '../constants/icons.jsx';

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
const Navbar = () =>{
    return(
        <Bar>
            <Title>UMC PlayList</Title>
            <Icons.CartIcon/>
        </Bar>
    )
}
export default Navbar