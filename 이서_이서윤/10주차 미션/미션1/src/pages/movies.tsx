import styled from "styled-components";
import {Link} from "react-router-dom";
import Category from "../components/category";
import cover1 from "../assets/cover1.png";
import cover2 from "../assets/cover2.png";
import cover3 from "../assets/cover3.png";
import cover4 from "../assets/cover4.png";

const Container=styled.div`
    background-color:black;
    width:calc(100vw - 200px);
`;
const Title=styled.div`
    font-size:30px;
    font-weight:800;
    color:white;
    margin:30px;
`;
const Wapper=styled.div`
    display:flex;
    justify-content: space-around; //균등한 간격으로 배치
`;
const MoviesPage = () => {
    return (
        <Container>
            <Title>카테고리</Title>
            <Wapper>
                <Link to={'/movies/now-playing'}><Category img={cover1} text="현재 상영중인"/></Link>
                <Link to={'/movies/popular'}><Category img={cover2} text="인기있는"/></Link>
                <Link to={'/movies/top-rated'}><Category img={cover3} text="높은 평가를 받은"/></Link>
                <Link to={'/movies/up-coming'}><Category img={cover4} text="개봉 예정중인"/></Link>
            </Wapper>
        </Container>
    );
};

export default MoviesPage;