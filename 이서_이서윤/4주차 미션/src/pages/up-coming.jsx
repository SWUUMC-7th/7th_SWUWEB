import { useState, useEffect } from "react";
import MovieCard from "../components/moviecard";
import useCustomFetch from "../../hooks/useCustomFetch";
import LoadingSpinner from "../components/loadingSpinner"
import { MovieGrid } from "../layout/movieGrid";
import MovieFetchError from "../components/movieFetchError";

const UpComing = () => {
    const [movies, setMovies] = useState([]);

    const {data, isLoading, isError} = useCustomFetch('/movie/upcoming?language=ko-KR&page=1')

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
                    title={movie.title}
                    poster={movie.poster_path}
                    release_date={movie.release_date}
                />
            ))}
        </MovieGrid>
    );
};

export default UpComing;
