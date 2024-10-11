import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard";
import useCustomFetch from "../../hooks/useCustomFetch";
import { MovieGrid } from "../layout/movieGrid";

const TopRated = () => {
    const [movies, setMovies] = useState([]);

    const {data, isLoading, isError} = useCustomFetch('/movie/top_rated?language=ko-KR&page=1')

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
        <MovieGrid>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    title={movie.title}
                    poster={movie.poster_path}
                    release_date={movie.release_date}
                />
            ))}
        </MovieGrid>
    );
};

export default TopRated;
