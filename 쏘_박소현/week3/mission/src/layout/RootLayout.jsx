import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const RootLayout = () => {
    return (
        <Layout>
            <Navbar/>
            <Outlet/>
        </Layout>
    );
};

export default RootLayout;
