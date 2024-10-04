import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styled from "styled-components";

const Main=styled.div`
    width:100vw;
    height:100vh;
`;
const Container=styled.div`
    display:flex;
   
`;

const RootLayout = () => {
    return (
        <Main>
            <Navbar/>
            <Container>
                <Sidebar/>
                <Outlet/>
            </Container>
        </Main>
    );
};

export default RootLayout;