import styled from "styled-components";

const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
    *{color:white;}
`;

const Search = () => {
    return (
        <Container>
            <h1>검색 페이지</h1>
        </Container>
    );
};

export default Search;