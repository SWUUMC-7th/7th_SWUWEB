import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 100vw;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const RootLayout = () => {
    return (
        <Layout>
            <Navbar/>
            <Container>
            <Sidebar/>
            <Outlet/>    
            </Container>

        </Layout>
    );
};

export default RootLayout;
