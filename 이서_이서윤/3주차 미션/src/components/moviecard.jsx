/* eslint-disable react/prop-types */
import styled from "styled-components";

const Wrapper=styled.div`
    margin:10px;
    height:250px;
    div{
        color:white;
        margin-top:-3px;
    }
`;
const Img=styled.img`
    width:150px;
    height:210px;
    border-radius:10px;
`;
const Title=styled.div`
    font-size:14px;
    font-weight:800;
`;
const Date=styled.div`
    font-size:11px;
`;
const MovieCard=({key, title, poster, release_date})=>{
    const src='https://image.tmdb.org/t/p/w500';
    return(
        <>
            <Wrapper>
                <Img src={`${src}${poster}`} alt={key}/>
                <Title>{title}</Title>
                <Date>{release_date}</Date>
            </Wrapper>
        </>
    );
};
export default MovieCard;