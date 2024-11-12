    import {Link} from "react-router-dom";
    import styled from "styled-components";
    import useIsLogin from '../../hooks/useIsLogin'
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
        const {nickname, setLogout} = useIsLogin();

        const handleLogout = () => {
            setLogout(); 
        };

        return (
            <Container>
                <Link to={'/'}><Logo>YONGCHA</Logo></Link>
                <Right>
                    {nickname && (
                        <>
                            <UserLogin>{`${nickname}님 환영합니다!`}</UserLogin>
                            <LogIn onClick={handleLogout}>로그아웃</LogIn>
                        </>
                    )}
                    {!nickname && (
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