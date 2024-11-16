import styled from "styled-components";
import { MdOutlineErrorOutline } from "react-icons/md";

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
    font-size:20px;
    font-weight:700;
    color:#ed5d47;
`;
const Error = () =>{
    return(
        <Container>
            <Wrapper>
                <MdOutlineErrorOutline color="#ed5d47" size='150'/>
                <Error>ERROR</Error>
                <Text>오류가 발생했습니다</Text>
            </Wrapper>
        </Container>
    )
}

export default Error