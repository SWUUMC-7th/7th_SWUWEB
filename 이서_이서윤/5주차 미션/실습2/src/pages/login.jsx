import styled from "styled-components";
import useForm from "../../hooks/useForm";
import { validateLogin } from "../../utils/validate";

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
const LoginBtn=styled.button`
    width:410px;
    height:45px;
    background-color:${(props)=>props.disabled ? 'gray' : '#F2075D'};
    color:white;
`;
const Error=styled.div`
    color:red;
    font-size:15px;
    text-align:left;
    margin-left:50px;
    margin-top:-5px;
    margin-bottom:15px;
`;
const LogInPage = () => {
    const login = useForm({
        initialValue:{
            email:'',
            password:'',
        },
        validate: validateLogin 
    }); 
    const emailCheck = login.touched.email && login.errors.email;
    const pwCheck = login.touched.password && login.errors.password;
    return (
        <Container>
            <LogInBox>
                <Title>로그인</Title>
                <Input 
                    placeholder="이메일을 입력해주세요" 
                    error={emailCheck}
                    {...login.getTextInputProps('email')}
                />
                {emailCheck && <Error>{login.errors.email}</Error>}
                <Input 
                    type="password"
                    placeholder="비밀번호를 입력해주세요" 
                    error={pwCheck}
                    {...login.getTextInputProps('password')}
                />
                {pwCheck && <Error>{login.errors.password}</Error>}
                <LoginBtn disabled={!login.values.email || !login.values.password || emailCheck || pwCheck}>로그인</LoginBtn>
            </LogInBox>
        </Container>
    );  
};

export default LogInPage;