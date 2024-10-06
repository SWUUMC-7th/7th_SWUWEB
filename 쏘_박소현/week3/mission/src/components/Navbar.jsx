import { Link } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center; 
  padding: 10px 20px;
  background-color: #282c34; 
  color: white; 
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  text-decoration: none; 
  color: white; 

`;

const LeftNav = styled.div`

`;

const RightNav = styled.div`
    display: flex;
    gap: 10px;
`;

const Logo = styled(Link)`
    color: #ff3557;
    font-size: 30px;
    font-weight: 700;
    text-decoration: none; 
`;

const Button = styled.button`
  background-color: transparent; 
  color: white;  
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff3557; 
    color: white; 
    border: none;
  }
`;

const SignupButton = styled.button`
    background-color: #ff3557; 
    border: none;
`;

const Navbar = () => {
    return (
        <Header>
            <LeftNav>
            <Logo to="/">Movie</Logo>
            </LeftNav>
            <RightNav>
            <NavLink to="/sign-in">
                <Button>로그인</Button> 
            </NavLink>
            <NavLink to="/sign-up">
                <SignupButton>회원가입</SignupButton> 
            </NavLink>
            </RightNav>

        </Header>
    );
};

export default Navbar;
