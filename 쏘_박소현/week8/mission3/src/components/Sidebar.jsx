import { Link } from "react-router-dom";
import styled from 'styled-components';
import { FaSearch, FaFilm } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #282c34;
  color: white;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 10px 0;
  font-size: 18px;
  transition: color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    color: #61dafb;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/search">
        <Icon><FaSearch /></Icon>
        찾기
      </SidebarLink>
      <SidebarLink to="/movies/categories">
        <Icon><FaFilm /></Icon>
        영화
      </SidebarLink>
    </SidebarContainer>
  );
}

export default Sidebar;
