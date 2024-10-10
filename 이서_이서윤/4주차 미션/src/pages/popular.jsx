import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/moviecard";
import styled from "styled-components";

const Container=styled.div`
    width: clac(100vw - 200px);
    background-color:black;
    display:flex;
    flex-wrap:wrap;
    padding-top:10px;
    padding-left:25px;
    gap:10px;
`;

const Popular = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1`,{
                    headers:{
                        Authorization:`Bearer ${import.meta.env.VITE_API_KEY}`
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        getMovies();
    }, []);

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

export default Popular;
