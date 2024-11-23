import styled from 'styled-components';

const Bar = styled.div `
    width:100vw;
    height:70px;
    background-color:#5852FF;
    display:flex;
    justify-content:center;
    
    *{
        color:white;
        font-size:30px;
        line-height:70px;
    }
`;
const Title=styled.div`
    font-size:30px;
    font-weight:700;
`;
const Footer = () =>{
    return( 
        <Bar>
            <Title>University Makeus Challenge!</Title>
        </Bar>
    )
}
export default Footer;