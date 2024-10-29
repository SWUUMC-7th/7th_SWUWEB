import styled from "styled-components";

const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
    display: flex;
    justify-content: center; 
    align-items: center;  
    height:calc(100vh - 60px);
    border-radius: 1px solid blue;
`;
const LogInBox=styled.div`
    width: 500px;
    height:700px;
    text-align:center;
`;
const Title=styled.div`
    font-size:25px;
    font-weight:700;
    color:white;
    margin-bottom:20px;
`;
const Input=styled.input`
    width:400px;
    height:35px;
    border-color:${(props)=>props.error ? 'red' : 'black'};
    border-radius:10px;
    margin-bottom:10px;
`;
const SignupBtn=styled.button`
    width:410px;
    height:45px;
    background-color:${(props)=>props.disabled ? 'gray' : '#F2075D'};
    color:white;
`;
// const Error=styled.div`
//     color:red;
//     font-size:15px;
//     text-align:left;
//     margin-left:50px;
//     margin-top:-5px;
//     margin-bottom:15px;
// `;

const SignUpPage = () => {
    return (
        <Container>
            <LogInBox>
                <Title>회원가입</Title>
                <Input 
                    placeholder="이메일을 입력해주세요" 
                />
                <Input 
                    type="password"
                    placeholder="비밀번호를 입력해주세요" 
                />
                <Input 
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요" 
                /> 
                <SignupBtn type="submit">제출</SignupBtn>
            </LogInBox>
        </Container>
    );
};

export default SignUpPage;