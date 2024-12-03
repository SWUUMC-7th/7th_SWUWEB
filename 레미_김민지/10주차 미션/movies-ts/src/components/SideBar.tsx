import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoSearch, IoVideocam } from "react-icons/io5";
import RoutePaths from "../routes/RoutePaths";

const SideBar = () => {
  return (
    <SidebarContainer>
      <SidebarMenu>
        <SidebarLink to={RoutePaths.SEARCH}>
          <IoSearch />
          찾기
        </SidebarLink>
        <SidebarLink to={RoutePaths.MOVIES}>
          <IoVideocam />
          영화
        </SidebarLink>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default SideBar;

const SidebarContainer = styled.div`
  width: 160px;
  height: 100%;
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
