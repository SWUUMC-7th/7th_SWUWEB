import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAuth from "../hooks/useAuth.js";

const Navbar = () => {
  const { nickname, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavContainer>
      <Logo>
        <Link to="/">YONGCHA</Link>
      </Logo>
      <NavItems>
        {nickname ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Nickname>{nickname}님 반갑습니다!</Nickname>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </div>
        ) : (
          <>
            <LoginButton>
              <Link to="/login">로그인</Link>
            </LoginButton>
            <SignUpButton>
              <Link to="/signup">회원가입</Link>
            </SignUpButton>
          </>
        )}
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
    text-decoration: none;
    color: #ff213b;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 16px;
`;

const Nickname = styled.div`
  font-size: 18px;
  color: white;
  margin-right: 16px;
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

const LogoutButton = styled.button`
  background-color: #ff213b;
  border: none;
  border-radius: 18px;
  padding: 10px 20px;
  cursor: pointer;
  color: white;
`;
