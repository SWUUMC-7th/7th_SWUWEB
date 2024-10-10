import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard";
import styled from "styled-components";
import useCustomFetch from "../../hooks/useCustomFetch";

const Container=styled.div`
    width: clac(100vw - 200px);
    background-color:black;
    display:flex;
    flex-wrap:wrap;
    padding-top:10px;
    padding-left:25px;
    gap:10px;
`;

const UpComing = () => {
    const [movies, setMovies] = useState([]);

    const {data, isLoading, isError} = useCustomFetch('/movie/upcoming?language=ko-KR&page=1')

    useEffect(() => {
        if (data) {
            setMovies(data); 
        }
    }, [data]); 

    if(isLoading){
        return <div>로딩 중 입니다...</div>
    }
    if(isError){
        return <div>오류</div>
    }
    
    return (
        <Container>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    title={movie.title}
                    poster={movie.poster_path}
                    release_date={movie.release_date}
                />
            ))}
        </Container>
    );
};

export default UpComing;
