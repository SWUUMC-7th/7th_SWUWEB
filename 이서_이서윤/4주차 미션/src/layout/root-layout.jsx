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
const Page=styled.div`
    width:calc(100vw - 200px);
    background-color:black;
`;
const RootLayout = () => {
    return (
        <Main>
            <Navbar/>
            <Container>
                <Sidebar/>
                <Page>
                    <Outlet/>
                </Page>
            </Container>
        </Main>
    );
};

export default RootLayout;