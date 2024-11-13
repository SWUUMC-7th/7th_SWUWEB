import { useInfiniteQuery, useQuery } from "react-query";
import { getMovies } from "../api/movies/getMovies";
import { getMovieDetail } from "../api/movies/getMovieDetail";
import { getCredits } from "../api/movies/getCredits";

const useMovie = (category, movieId) => {
  const {
    data: movieListData,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["movies", category],
    ({ pageParam = 1 }) => {
      return getMovies({ category, page: pageParam });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.results.length > 0 ? allPages.length + 1 : undefined;
      },
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
    movieList: movieListData?.pages.flatMap((page) => page.results) || [],
    movie: movieDetailData || null,
    credits: creditsData || {},
    isLoading: isMoviesLoading || isMovieDetailLoading || isCreditsLoading,
    isError: isMoviesError || isMovieDetailError || isCreditsError,
    fetchNextPage,
    hasNextPage,
  };
};

export default useMovie;
