import MovieCard from "../components/moviecard";
import { MovieGrid } from "../layout/movieGrid";
import MovieFetchError from "../components/movieFetchError";
import { useGetMovies } from "../../hooks/queries/useGetMovies";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../components/skeleton";

const NowPaying = () => {
    const {data, isPending, isError} = useQuery({
        queryFn:()=>useGetMovies({category:'now_playing',pageParam:1}),
        queryKey:['movies','now_playing'],
        cacheTime:10000,
        staleTime:10000
    })

    if(isPending){
        return (
            <MovieGrid>
                {Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} />))}
            </MovieGrid>
        );
    }
    if(isError){
        return <MovieFetchError/>
    }

    return (
        <MovieGrid>
            {data.results.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                />
            ))}
        </MovieGrid>
    );
};

export default NowPaying;
