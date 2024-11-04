import styled from "styled-components";
import useForm from "../../hooks/useForm";
import { validateSignup } from "../../utils/validate";

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
const Error=styled.div`
    color:red;
    font-size:15px;
    text-align:left;
    margin-left:50px;
    margin-top:-5px;
    margin-bottom:15px;
`;

const SignUpPage = () => {
    const signup = useForm({
        initialValue:{
            name:'',
            birth:'',
            email:'',
            password:'',
            passwordCheck:'',
        },
        validate: validateSignup
    }); 
    const nameCheck = signup.touched.name && signup.errors.name;
    const birthCheck = signup.touched.birth && signup.errors.birth;
    const emailCheck = signup.touched.email && signup.errors.email;
    const pwCheck = signup.touched.password && signup.errors.password;
    const pwcCheck = signup.touched.passwordCheck && signup.errors.passwordCheck;
    const handlePressSignup=()=>{
        console.log(signup.values);
    }
    return (
        <Container>
            <LogInBox>
                <Title>회원가입</Title>
                <Input 
                    placeholder="성함을 입력해주세요" 
                    error={nameCheck}
                    {...signup.getTextInputProps('name')}
                />
                {nameCheck && <Error>{signup.errors.name}</Error>}
                <Input 
                    placeholder="생년월일을 입력해주세요 (YYYYMMDD)" 
                    error={birthCheck}
                    {...signup.getTextInputProps('birth')}
                />
                {birthCheck && <Error>{signup.errors.birth}</Error>}
                <Input 
                    placeholder="이메일을 입력해주세요" 
                    error={emailCheck}
                    {...signup.getTextInputProps('email')}
                />
                {emailCheck && <Error>{signup.errors.email}</Error>}
                <Input 
                    type="password"
                    placeholder="비밀번호를 입력해주세요" 
                    error={pwCheck}
                    {...signup.getTextInputProps('password')}
                />
                {pwCheck && <Error>{signup.errors.password}</Error>}
                <Input 
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요" 
                    error={pwcCheck}
                    {...signup.getTextInputProps('passwordCheck')}
                /> 
                {pwcCheck && <Error>{signup.errors.passwordCheck}</Error>}
                <SignupBtn 
                    type="submit"
                    disabled={ !signup.values.name || !signup.values.birth || !signup.values.email || 
                                !signup.values.password || !signup.values.passwordCheck ||
                                signup.errors.name || signup.errorsbirth || signup.errors.email || 
                                signup.errors.password || signup.errors.passwordCheck
                    }
                    onClick={handlePressSignup}
                >
                    제출
                </SignupBtn>
            </LogInBox>
        </Container>
    );
};

export default SignUpPage;