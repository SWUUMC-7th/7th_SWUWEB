import { useState } from "react";
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
    border:1px solid red; 
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
    background-color:#F2075D;
    color:white;
`;
const Error=styled.div`
    color:red;
    font-size:15px;
    border:1px solid yellow; 
    margin-left:-180px;
    margin-top:-5px;
`;
const LogInPage = () => {
    const[email,setEmail]=useState("");
    const[pw,setPW]=useState("");
    const[emailError,setEmailError]=useState(false);
    const[pwError,setPwError]=useState(false);
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const setFocusPh=(e)=>{
        e.target.placeholder='';
    }
    const setBlurPh=(e,type)=>{
        e.target.placeholder=`${type} 입력해주세요`
    }

    const emailCheck=()=>{
        const isEmailValid = emailValidation.test(email);
        setEmailError(!isEmailValid);
        console.log(email,":",emailError);
    }

    return (
        <Container>
            <LogInBox>
                <Title>로그인</Title>
                <Input 
                    placeholder="이메일을 입력해주세요" 
                    onFocus={(e)=>setFocusPh(e)} 
                    onBlur={(e)=>{setBlurPh(e,'이메일을'),emailCheck()}}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Error>{emailError && "올바른 이메일 형식이 아닙니다."}</Error>
                <Input 
                    placeholder="비밀번호를 입력해주세요" 
                    onFocus={(e)=>setFocusPh(e)} 
                    onBlur={(e)=>setBlurPh(e,'비밀번호를')}
                    onChange={(e)=>setPW(e.target.value)}   
                />
                <LoginBtn>로그인</LoginBtn>
            </LogInBox>
        </Container>
    );  
};

export default LogInPage;