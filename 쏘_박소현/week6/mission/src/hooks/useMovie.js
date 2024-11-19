import { useQuery } from "react-query";
import { getMovies } from "../api/movies/getMovies";
import { getMovieDetail } from "../api/movies/getMovieDetail";
import { getCredits } from "../api/movies/getCredits";

const useMovie = (category, movieId, page) => {
  const {
    data: movieListData,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
  } = useQuery(
    ["movies", category, page],
    () => getMovies({ category, page }),
    {
      keepPreviousData: true,
    }
  );

  const {
    data: movieDetailData,
    isLoading: isMovieDetailLoading,
    isError: isMovieDetailError,
  } = useQuery(["movieDetail", movieId], () => getMovieDetail(movieId), {
    enabled: !!movieId,
  });

  const {
    data: creditsData,
    isLoading: isCreditsLoading,
    isError: isCreditsError,
  } = useQuery(["credits", movieId], () => getCredits(movieId), {
    enabled: !!movieId,
  });

  return {
    movieList: movieListData?.results || [],
    movie: movieDetailData || null,
    credits: creditsData || {},
    isLoading: isMoviesLoading || isMovieDetailLoading || isCreditsLoading,
    isError: isMoviesError || isMovieDetailError || isCreditsError,
  };
};

export default useMovie;
