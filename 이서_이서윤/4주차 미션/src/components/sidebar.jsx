import {Link} from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { BiSolidCameraMovie } from "react-icons/bi";

const Container=styled.div`
    width:200px;
    height:calc(100vh - 60px);
    background-color:#141414;
    position:fixed; top:60px;
`;
const List=styled.div`
    width:200px;
    height:50px;
    line-height:50px;
    *{
        color:white;
        font-weight:800;
        padding: 0 10px;
    }
`;
const Sidebar = () => {
    return (
        <Container>
            <List><Link to={'/search'}><FaSearch />찾기</Link></List>
            <List><Link to='/movies'><BiSolidCameraMovie />영화</Link></List>
        </Container>
    );
};

export default Sidebar;