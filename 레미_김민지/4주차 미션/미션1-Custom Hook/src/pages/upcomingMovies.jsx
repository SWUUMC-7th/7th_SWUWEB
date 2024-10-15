import { MovieGrid } from "../layout/movieGrid";
import MovieCards from "../components/movieCards";
import useCustomFetch from "../hooks/useCustomFetch";

const UpComingMovies = () => {
  const { data: movies, isLoading, isError } = useCustomFetch(`/movie/upcoming?language=ko&page=1`);

  return (
    <div>
      <h1>개봉 예정인 영화</h1>
      <MovieGrid>
        {movies.data?.results.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </div>
  );
};

export default UpComingMovies;
