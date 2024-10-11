import { useParams } from "react-router-dom"
import useCustomFetch from "../../hooks/useCustomFetch"
import MovieFetchError from "../components/movieFetchError";
import LoadingSpinner from "../components/loadingSpinner";

const MovieDetails = () =>{
    const params=useParams();
    console.log('movieId',params.movieId);
    const {data, isLoading, isError} = useCustomFetch(`/movie/${params.movieId}?language=ko-KR`,true)
    console.log('data:',data);
    if(isLoading){
        return <LoadingSpinner/>
    }
    if(isError){
        return <MovieFetchError/>
    }

    return(
        <div>{data.id}페이지</div>
    )
}

export default MovieDetails