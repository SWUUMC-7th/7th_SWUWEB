/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Skeleton from "./skeleton";
const Wrapper=styled.div`
    margin:10px;
    height:250px;
    position:relative;
    div{
        color:white;
        margin-top:-3px;
    }
`;
const Div=styled.div`
    position:absolute;
    width:150px;
    height:210px;
    &:hover{
        background-color:rgba(0,0,0,0.5);
    }
`;
const Img=styled.img`
    width:150px;
    height:210px;
    border-radius:10px;
`;
const EmptyImg=styled.div`
    width:150px;
    height:210px;
    border-radius:10px;
    background-color:grey;
`;
const Title=styled.div`
    font-size:14px;
    font-weight:800;
    width:150px;
    white-space: nowrap;  
    overflow: hidden; 
    text-overflow: ellipsis; 
`;
const Date=styled.div`
    font-size:11px;
`;
const MovieCard=({movie})=>{
    const src='https://image.tmdb.org/t/p/w500';
    const navigate=useNavigate();
    return(
        <>
            <Wrapper onClick={()=>navigate(`/movies/${movie.id}`,{state:movie})}>
                <Div></Div>
                {
                    movie.poster_path ? 
                    <Img src={`${src}${movie.poster_path}`} alt={movie.title}/> :
                    <EmptyImg></EmptyImg>
                }
                <Title>{movie.title}</Title>
                <Date>{movie.release_date}</Date>
            </Wrapper>
        </>
    );
};
export default MovieCard;