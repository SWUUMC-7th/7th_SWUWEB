/* eslint-disable react/prop-types */
import styled from "styled-components";

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
    top:3px;
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
const MovieCard=({key, title, poster, release_date})=>{
    const src='https://image.tmdb.org/t/p/w500';
    return(
        <>
            <Wrapper>
                <Div></Div>
                <Img src={`${src}${poster}`} alt={key}/>
                <Title>{title}</Title>
                <Date>{release_date}</Date>
            </Wrapper>
        </>
    );
};
export default MovieCard;