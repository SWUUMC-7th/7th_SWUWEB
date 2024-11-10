import MovieCard from "../components/moviecard";
import { MovieGrid } from "../layout/movieGrid";
import MovieFetchError from "../components/movieFetchError";
import Skeleton from "../components/skeleton";
import { useGetInfiniteMovies } from "../../hooks/queries/useGetInfiniteMovies";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import InfiniteDiv from "../components/infiniteDiv";

const NowPaying = () => {
 
    const {data, isFetching, hasNextPage, fetchNextPage, isError} = useGetInfiniteMovies('now_playing')
    const {ref, inView} = useInView({
        threshold:0,
    })

    useEffect(()=>{
        if(inView){
            !isFetching && hasNextPage && fetchNextPage();
        }
    },[inView, isFetching, hasNextPage, fetchNextPage])

    if(isError){
        return <MovieFetchError/>
    }

    return (
        <MovieGrid>
            {data?.pages.map((page) => (
                page.results.map((movie)=>(
                    <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    />
                ))
            ))}
            {isFetching && Array.from({ length: 20 }).map((_, index) => (
                <Skeleton key={index} />))}
            <InfiniteDiv ref={ref} >
                {isFetching && <ClipLoader color="#F2075D" size='50px'/>}
            </InfiniteDiv>
        </MovieGrid>
    );
};

export default NowPaying;
