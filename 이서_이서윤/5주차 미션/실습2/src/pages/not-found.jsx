import styled from "styled-components";

const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
    *{color:white;}
`;

const NotFound = () => {
    return (
        <Container>
            <h1>해당 페이지가 없습니다</h1>
        </Container>
    );
};

export default NotFound;