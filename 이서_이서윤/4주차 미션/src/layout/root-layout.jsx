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
    height:calc(100vh - 60px);
    background-color:black;
    position:fixed;
    left:200px; top:60px;
    overflow-x: hidden;
    overflow-y: auto; 
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