import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const Container = styled.div`
    position:fixed;
    left:0; top:0;
    width: 100vw;  /* 화면 전체 기준 */
    height: 100vh; 
    display: flex;
    justify-content: center; 
    align-items: center 
`;
const Wrapper = styled.div`
    width:500px;
    height:500px;
    text-align:center;
`;
const Text = styled.div`
    font-size:30px;
    color:white;
    margin-top:20px;
`;
const LoadingSpinner=()=>{
    return(
        <Container>
            <Wrapper>
                <ClipLoader color="#F2075D" size='150'/>
                <Text>로딩 중입니다...</Text>
            </Wrapper>
        </Container>
    )
}

export default LoadingSpinner