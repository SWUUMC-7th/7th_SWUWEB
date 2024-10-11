import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard";
import useCustomFetch from "../../hooks/useCustomFetch";
import LoadingSpinner from "../components/loadingSpinner"
import { MovieGrid } from "../layout/movieGrid";
import MovieFetchError from "../components/movieFetchError";

const TopRated = () => {
    const [movies, setMovies] = useState([]);
    const {data, isLoading, isError} = useCustomFetch('/movie/top_rated?language=ko-KR&page=1')

    useEffect(() => {
        if (data) {
            setMovies(data); 
        }
    }, [data]); 

    if(isLoading){
        return <LoadingSpinner/>
    }
    if(isError){
        return <MovieFetchError/>
    }

    return (
        <MovieGrid>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                />
            ))}
        </MovieGrid>
    );
};

export default TopRated;
