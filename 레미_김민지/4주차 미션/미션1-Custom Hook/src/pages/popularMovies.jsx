import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import useCustomFetch from "../hooks/useCustomFetch";

const PopularMovies = () => {
  const { data: movies, isLoading, isError } = useCustomFetch(`/movie/popular?language=ko&page=1`);

  return (
    <div>
      <h1>인기있는 영화</h1>
      <MovieGrid>
        {movies.data?.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </div>
  );
};

export default PopularMovies;
