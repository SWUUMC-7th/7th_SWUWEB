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
    color:white;
`;
const Error = styled.div`
    font-size:50px;
    font-weight:800;
    color:#F2075D;
    margin-bottom:10px;
`;
const MovieFetchError = () =>{
    return(
        <Container>
            <Wrapper>
                <MdOutlineErrorOutline color="#F2075D" size='150'/>
                <Error>ERROR</Error>
                <Text>영화 목록을 불러올 수 없습니다 </Text>
                <Text>다시 시도해주세요</Text>
            </Wrapper>
        </Container>
    )
}

export default MovieFetchError