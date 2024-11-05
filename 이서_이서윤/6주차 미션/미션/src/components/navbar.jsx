import { useEffect, useState, useCallback } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
const Container=styled.div`
    display:flex;
    padding:0 20px;
    justify-content:space-between;
    width:calc(100vw - 40px); height:60px;
    line-height:60px;
    background-color:#141414;
    position:fixed; left:0;top:0;
`;
const Right=styled.div` 
    font-size:15px;
`;
const Logo=styled.div`
    color:#F2075D;
    font-size:25px;
    font-weight:800;
`;
const LogIn=styled.button`
    margin: 0 20px;
    padding:5px 10px;
    color:white;
    background:none;
    &:hover{
        background-color:#2E3033;
    }
`;
const SignUp=styled.button`
    padding:5px 10px;
    color:white;
    background-color:#F2075D;
    &:hover{
        background-color:#F72F78;
    }
`;
const UserLogin=styled.button`
    color:white;
    background:none;
`;
const Navbar = () => {
    const [isLogin,setIsLogin]=useState(false);
    const [nickname,setNickname]=useState('');
    const accessToken = localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLogin(false); 
    };
    
    const fetchUserInfo = useCallback( async () => {
        console.log('사용 중인 accessToken:', accessToken);
        try {
            const response = await axios.get('http://localhost:3000/user/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            setNickname((response.data.email).split('@')[0]);
        } catch (error) {
            console.log('사용자 정보 얻기 실패:', error);
        }
    },[accessToken]);
    

    useEffect(()=>{
        if (accessToken) {
            setIsLogin(true);
            fetchUserInfo();
        } 
    }, [accessToken,setIsLogin, fetchUserInfo]);

    return (
        <Container>
            <Link to={'/'}><Logo>YONGCHA</Logo></Link>
            <Right>
                {isLogin && (
                    <>
                        <UserLogin>{`${nickname}님 환영합니다!`}</UserLogin>
                        <LogIn onClick={handleLogout}>로그아웃</LogIn>
                    </>
                )}
                {!isLogin && (
                    <>
                        <Link to={'/login'}><LogIn>로그인</LogIn></Link>
                        <Link to={'/signup'}><SignUp>회원가입</SignUp></Link>
                    </>
                )}
            </Right>
        </Container>
    );
};

export default Navbar;