import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Sidebar from "../components/sidebar.jsx";
import styled from "styled-components";

const RootLayout = () => {
  return (
    <Container>
      <Navbar />
      <MainContent>
        <Sidebar />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default RootLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #191919;
  color: white;
  /* overflow-y: auto; 내용이 길어지면 스크롤 */
`;
