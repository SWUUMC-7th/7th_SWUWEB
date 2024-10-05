import styled from "styled-components";

const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
    *{color:white;}
`;

const SignUpPage = () => {
    return (
        <Container>
            <h1>회원가입 페이지</h1>
        </Container>
    );
};

export default SignUpPage;