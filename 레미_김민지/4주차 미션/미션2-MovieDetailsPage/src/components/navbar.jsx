import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <NavContainer>
      <Logo>
        <Link to="/">YONGCHA</Link>
      </Logo>
      <NavItems>
        <LoginButton>
          <Link to="/login">로그인</Link>
        </LoginButton>
        <SignUpButton>
          <Link to="/signup">회원가입</Link>
        </SignUpButton>
      </NavItems>
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background-color: #282727;
  color: white;
`;

const Logo = styled.div`
  font-size: 32px;
  font-weight: bold;

  a {
    text-decoration: none; /**기존 css 스타일 없애기 위해 */
    color: #ff213b;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 16px;
`;

const LoginButton = styled.button`
  background-color: transparent;

  border: none;
  padding: 10px 20px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
  }
`;

const SignUpButton = styled.button`
  background-color: #ff213b;
  border: none;
  border-radius: 18px;
  padding: 10px 20px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: white;
  }
`;
