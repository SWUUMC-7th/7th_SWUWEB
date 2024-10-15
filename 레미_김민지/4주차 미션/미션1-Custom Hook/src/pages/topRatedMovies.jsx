import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import useCustomFetch from "../hooks/useCustomFetch";

const TopRatedMovies = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useCustomFetch(`/movie/top_rated?language=ko&page=1`);

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
