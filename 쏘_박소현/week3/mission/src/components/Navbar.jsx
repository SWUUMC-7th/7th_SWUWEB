import { Link } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  align-items: center; 
  padding: 10px 20px;
  background-color: #282c34; 
  color: white; 
  justify-content: space-between;
  margin-bottom: 30px;
`;

const NavLink = styled(Link)`
  text-decoration: none; 
  color: white; 
  font-size: 16px; 
  transition: color 0.3s; 

  &:hover {
    color: #61dafb; 
  }
`;

const LeftNav = styled.div`

`;

const RightNav = styled.div`
    display: flex;
    gap: 10px;
`;

const Navbar = () => {
    return (
        <Header>
            <LeftNav>
                <h2>Movie</h2>
            </LeftNav>
            <RightNav>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to='/movies'>영화 목록 페이지로 이동</NavLink>   
            </RightNav>

        </Header>
    );
};

export default Navbar;
