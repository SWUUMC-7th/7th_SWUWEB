import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import RoutePaths from "../routes/RoutePaths";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // logout();
    navigate(RoutePaths.LOGIN);
  };

  return (
    <NavContainer>
      <Logo>
        <Link to={RoutePaths.HOME}>REMI'S MOVIES</Link>
      </Logo>
      <NavItems>
        <>
          <LoginButton>
            <Link to={RoutePaths.LOGIN}>로그인</Link>
          </LoginButton>
          <SignUpButton>
            <Link to={RoutePaths.SIGNUP}>회원가입</Link>
          </SignUpButton>
        </>
        {/* {nickname ? (
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
        )} */}
      </NavItems>
    </NavContainer>
  );
};

export default NavBar;

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
