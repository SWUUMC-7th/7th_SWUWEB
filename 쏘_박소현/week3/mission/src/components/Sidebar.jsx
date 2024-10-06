
import { Link } from "react-router-dom";
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #282c34;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin: 10px 0;
  font-size: 18px;
  transition: color 0.3s;

  &:hover {
    color: #61dafb;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/search">찾기</SidebarLink>
      <SidebarLink to="/movies">영화</SidebarLink>
    </SidebarContainer>
  );
}

export default Sidebar;
