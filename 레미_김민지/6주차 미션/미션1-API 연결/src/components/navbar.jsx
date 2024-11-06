import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../api/auth";

const Navbar = () => {
  const [nickname, setNickname] = useState(null);
  const navigate = useNavigate();

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        const userNickname = userInfo.email.split("@")[0];
        setNickname(userNickname);
      } catch (error) {
        console.log("유저 정보를 가져오지 못했습니다.");
      }
    };

    if (localStorage.getItem("accessToken")) {
      fetchUserInfo();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setNickname(null);
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
