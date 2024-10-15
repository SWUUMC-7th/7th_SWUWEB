import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import LoadingBar from "../components/loadingBar";
import useCustomFetch from "../hooks/useCustomFetch";
import Error from "../components/error";

const NowPlayingMovies = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/now_playing?language=ko&page=1`);

  if (isLoading) {
    return <LoadingBar text="영화를 불러오는 중입니다 ..." />;
  }

  if (isError) {
    return <Error text="영화 불러오는데 오류가 일어났습니다." />;
  }

  return (
    <>
      <h1>현재 상영중인 영화</h1>
      <MovieGrid>
        {movies.data?.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </>
  );
};

export default NowPlayingMovies;
