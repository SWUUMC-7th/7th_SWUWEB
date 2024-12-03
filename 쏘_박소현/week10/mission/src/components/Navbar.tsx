import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth/getMe";
import useAuth from "../hooks/useAuth";

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

const LeftNav = styled.div``;

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

interface User {
  email: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { logout } = useAuth(setUser);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userData = await getMe();
          setUser(userData);
        } catch (error) {
          console.error("유저 정보를 가져오는 데 실패했습니다:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <Header>
      <LeftNav>
        <Logo to="/">Movie</Logo>
      </LeftNav>
      <RightNav>
        {user ? (
          <>
            <p>{user.email.split("@")[0]}</p>
            <Button onClick={handleLogout}>로그아웃</Button>
          </>
        ) : (
          <>
            <NavLink to="/sign-in">
              <Button>로그인</Button>
            </NavLink>
            <NavLink to="/sign-up">
              <SignupButton>회원가입</SignupButton>
            </NavLink>
          </>
        )}
      </RightNav>
    </Header>
  );
};

export default Navbar;
