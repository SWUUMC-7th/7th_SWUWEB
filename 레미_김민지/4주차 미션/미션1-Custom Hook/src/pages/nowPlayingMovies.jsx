import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import useCustomFetch from "../hooks/useCustomFetch";

const NowPlayingMovies = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/now_playing?language=ko&page=1`);

  return (
    <div>
      <h1>현재 상영중인 영화</h1>
      <MovieGrid>
        {movies.data?.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </div>
  );
};

export default NowPlayingMovies;
