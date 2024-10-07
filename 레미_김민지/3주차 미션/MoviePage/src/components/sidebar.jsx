import styled from "styled-components";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarMenu>
        <SidebarLink to="/popular">인기</SidebarLink>
        <SidebarLink to="/chat">채팅</SidebarLink>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 160px;
  height: 100vh;
  background-color: #282727;
  padding: 20px;
  color: white;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;

  &:hover {
    color: #ff213b;
    font-weight: bold;
  }
`;
