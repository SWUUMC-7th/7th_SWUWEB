import { useState,useEffect } from "react";
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
    const[email,setEmail]=useState("");
    const[pw,setPW]=useState("");
    const[emailError,setEmailError]=useState(false);
    const[pwError,setPwError]=useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const setFocusPh=(e)=>{
        e.target.placeholder='';
    }
    const setBlurPh=(e,type)=>{
        e.target.placeholder=`${type} 입력해주세요`
    }

    useEffect(()=>{
        const emailCheck=()=>{
            const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const isEmailValid = emailValidation.test(email);
            setEmailError(email.length>0 && !isEmailValid);
        }
        emailCheck();
    },[email])

    useEffect(()=>{
        const pwCheck=()=>{
            setPwError(pw.length>0 && !(pw.length>=8 && pw.length<=16));
        }
        pwCheck();
    },[pw])

    useEffect(()=>{
        setIsDisabled(!email || !pw || emailError || pwError);
    },[email, pw,emailError, pwError])

    return (
        <Container>
            <LogInBox>
                <Title>로그인</Title>
                <Input 
                    placeholder="이메일을 입력해주세요" 
                    onFocus={(e)=>setFocusPh(e)} 
                    onBlur={(e)=>setBlurPh(e,'이메일을')}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Error>{emailError && "올바른 이메일 형식이 아닙니다."}</Error>
                <Input 
                    type="password"
                    placeholder="비밀번호를 입력해주세요" 
                    onFocus={(e)=>setFocusPh(e)} 
                    onBlur={(e)=>setBlurPh(e,'비밀번호를')}
                    onChange={(e)=>setPW(e.target.value)}   
                />
                <Error>{pwError && "비밀번호는 8~16자 이내로 입력해주세요."}</Error>
                <LoginBtn disabled={isDisabled}>로그인</LoginBtn>
            </LogInBox>
        </Container>
    );  
};

export default LogInPage;