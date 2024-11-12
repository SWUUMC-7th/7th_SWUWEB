import { useQuery } from "react-query";
import { getMovies } from "../api/movies/getMovies";
import { getMovieDetail } from "../api/movies/getMovieDetail"; 
import { getCredits } from "../api/movies/getCredits";

const useMovie = (category, movieId) => {
  const { data: movieListData, isLoading: isMoviesLoading, isError: isMoviesError } = useQuery(
    ["movies", category],
    () => getMovies(category),
    {
      enabled: !movieId,
    }
  );

  const { data: movieDetailData, isLoading: isMovieDetailLoading, isError: isMovieDetailError } = useQuery(
    ["movieDetail", movieId],
    () => getMovieDetail(movieId),
    {
      enabled: !!movieId,
    }
  );

  const { data: creditsData, isLoading: isCreditsLoading, isError: isCreditsError } = useQuery(
    ["credits", movieId],
    () => getCredits(movieId),
    {
      enabled: !!movieId,
    }
  );

  return {
    data: movieListData?.results || [],
    movie: movieDetailData || null,
    credits: creditsData || {},
    isLoading: isMoviesLoading || isMovieDetailLoading || isCreditsLoading,
    isError: isMoviesError || isMovieDetailError || isCreditsError,
  };
};

export default useMovie;
