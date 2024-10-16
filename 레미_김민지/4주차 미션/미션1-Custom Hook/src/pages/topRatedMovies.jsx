import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import LoadingBar from "../components/loadingBar";
import useCustomFetch from "../hooks/useCustomFetch";
import Error from "../components/error";

const TopRatedMovies = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/top_rated?language=ko&page=1`);

  if (isLoading) {
    return <LoadingBar text="영화를 불러오는 중입니다 ..." />;
  }

  if (isError) {
    return <Error text="영화 불러오는데 오류가 일어났습니다." />;
  }

  return (
    <div>
      <h1>높은 평점을 받은 영화</h1>
      <MovieGrid>
        {movies.data?.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </div>
  );
};

export default TopRatedMovies;
